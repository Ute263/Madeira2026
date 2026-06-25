#!/usr/bin/env python3
import json
import re
import shutil
import subprocess
import time
import urllib.parse
import urllib.request
from html import unescape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "images"
TMP = ROOT / "images" / "_commons_tmp"
CREDITS = ROOT / "images" / "credits.json"

TARGETS = {
    "hotel-cais-da-oliveira.jpg": "Caniço de Baixo Madeira coast",
    "ponta-da-oliveira.jpg": "Ponta da Oliveira Caniço Madeira",
    "canico.jpg": "Caniço Madeira",
    "garajau.jpg": "Garajau Madeira",
    "cristo-rei.jpg": "Cristo Rei Garajau Madeira",
    "praia-do-garajau.jpg": "Praia do Garajau Madeira",
    "mercado-dos-lavradores.jpg": "Mercado dos Lavradores Funchal",
    "funchal-altstadt.jpg": "Funchal old town Madeira",
    "funchal-marina.jpg": "Funchal marina Madeira",
    "funchal-promenade.jpg": "Funchal promenade Madeira",
    "barreirinha.jpg": "Barreirinha Funchal Madeira",
    "miradouro-do-guindaste.jpg": "Miradouro do Guindaste Madeira",
    "santana.jpg": "Santana Madeira traditional houses",
    "faial.jpg": "Faial Madeira",
    "porto-da-cruz.jpg": "Porto da Cruz Madeira",
    "pico-do-arieiro.jpg": "Pico do Arieiro Madeira",
    "ribeiro-frio.jpg": "Ribeiro Frio Madeira",
    "levada-dos-balcoes.jpg": "Levada dos Balcões Madeira",
    "fanalwald.jpg": "Fanal Forest Madeira",
    "paul-da-serra.jpg": "Paul da Serra Madeira",
    "ponta-de-sao-lourenco.jpg": "Ponta de São Lourenço Madeira",
    "machico.jpg": "Machico Madeira beach",
    "ribeira-brava.jpg": "Ribeira Brava Madeira",
    "sao-vicente.jpg": "São Vicente Madeira",
    "veu-da-noiva.jpg": "Véu da Noiva Madeira",
    "seixal.jpg": "Seixal Madeira beach",
    "porto-moniz.jpg": "Porto Moniz Madeira natural pools",
    "cabo-girao.jpg": "Cabo Girão Madeira",
    "camara-de-lobos.jpg": "Câmara de Lobos Madeira",
    "eira-do-serrado.jpg": "Eira do Serrado Madeira",
    "curral-das-freiras.jpg": "Curral das Freiras Madeira",
    "capela-nossa-senhora-fatima.jpg": "Capela Nossa Senhora de Fátima São Vicente Madeira",
    "ponta-do-pargo.jpg": "Ponta do Pargo Madeira",
    "doca-do-cavacas.jpg": "Doca do Cavacas Funchal",
    "pingo-doce-super-cancela.jpg": "Funchal Madeira supermarket",
    "continente-agua-de-pena.jpg": "Madeira airport Machico",
    "continente-canico.jpg": "Caniço Madeira",
    "spar-canico.jpg": "Caniço Madeira street",
    "sabores-da-ilha.jpg": "Madeira fruit market",
    "mercearia-jose-da-costa.jpg": "Madeira grocery market",
    "a-traineira.jpg": "Caniço Madeira restaurant",
    "a-rede.jpg": "Caniço Madeira restaurant",
    "snack-bar-mare.jpg": "Caniço de Baixo Madeira",
    "la-terraca.jpg": "Caniço Madeira restaurant terrace",
    "ti-laura.jpg": "Madeira espetada restaurant",
    "laranjinha.jpg": "Madeira restaurant food",
    "o-polar.jpg": "Madeira espetada restaurant",
    "o-casco.jpg": "Porto da Cruz Madeira restaurant",
    "vila-do-peixe.jpg": "Câmara de Lobos fish restaurant",
    "cachalote.jpg": "Porto Moniz restaurant Madeira",
    "sabores-do-curral.jpg": "Curral das Freiras chestnut Madeira",
    "akua.jpg": "Funchal restaurant Madeira",
    "armazem-do-sal.jpg": "Funchal old town restaurant",
    "balcony-bolo-do-caco.jpg": "Bolo do Caco Madeira",
    "madeira-tip.jpg": "Madeira island coast",
}

DAY_SOURCE = {
    "tag-1.jpg": "hotel-cais-da-oliveira.jpg",
    "tag-2.jpg": "canico.jpg",
    "tag-3.jpg": "funchal-altstadt.jpg",
    "tag-4.jpg": "garajau.jpg",
    "tag-5.jpg": "santana.jpg",
    "tag-6.jpg": "pico-do-arieiro.jpg",
    "tag-7.jpg": "ponta-da-oliveira.jpg",
    "tag-8.jpg": "machico.jpg",
    "tag-9.jpg": "camara-de-lobos.jpg",
    "tag-10.jpg": "seixal.jpg",
    "tag-11.jpg": "fanalwald.jpg",
    "tag-12.jpg": "levada-dos-balcoes.jpg",
    "tag-13.jpg": "curral-das-freiras.jpg",
    "tag-14.jpg": "ponta-do-pargo.jpg",
}


def clean_html(value):
    value = re.sub(r"<[^>]+>", "", value or "")
    return unescape(value).strip()


def commons_api(params):
    url = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "Madeira2026PWA/1.0"})
    with urllib.request.urlopen(req, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def find_image(query):
    data = commons_api({
        "action": "query",
        "format": "json",
        "generator": "search",
        "gsrnamespace": "6",
        "gsrlimit": "8",
        "gsrsearch": query,
        "prop": "imageinfo",
        "iiprop": "url|mime|extmetadata",
        "iiurlwidth": "1400",
    })
    pages = list((data.get("query", {}).get("pages", {}) or {}).values())
    for page in pages:
        info = (page.get("imageinfo") or [{}])[0]
        mime = info.get("mime", "")
        if not mime.startswith("image/"):
            continue
        meta = info.get("extmetadata", {})
        license_name = clean_html(meta.get("LicenseShortName", {}).get("value"))
        usage_terms = clean_html(meta.get("UsageTerms", {}).get("value"))
        if not any(token in f"{license_name} {usage_terms}".lower() for token in ["cc", "public domain", "pd"]):
            continue
        return {
            "title": page.get("title", ""),
            "url": info.get("thumburl") or info.get("url"),
            "page": meta.get("ObjectName", {}).get("value") or page.get("title", ""),
            "artist": clean_html(meta.get("Artist", {}).get("value")),
            "license": license_name or usage_terms,
            "license_url": clean_html(meta.get("LicenseUrl", {}).get("value")),
            "description": clean_html(meta.get("ImageDescription", {}).get("value")),
            "source_query": query,
        }
    return None


def download(url, out):
    req = urllib.request.Request(url, headers={"User-Agent": "Madeira2026PWA/1.0"})
    last_error = None
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=45) as response:
                out.write_bytes(response.read())
            return
        except Exception as exc:
            last_error = exc
            time.sleep(3 + attempt * 4)
    raise last_error


def convert_to_jpeg(src, dest):
    subprocess.run(["sips", "-s", "format", "jpeg", str(src), "--out", str(dest)], check=True, stdout=subprocess.DEVNULL)


def main():
    IMAGES.mkdir(exist_ok=True)
    if TMP.exists():
        shutil.rmtree(TMP)
    TMP.mkdir()

    credits = {}
    if CREDITS.exists():
      credits = json.loads(CREDITS.read_text(encoding="utf-8"))
    for filename, query in TARGETS.items():
        if filename in credits and (IMAGES / filename).exists():
            print(f"skip {filename}: already saved")
            continue
        print(f"search {filename}: {query}")
        try:
            image = find_image(query)
            if not image:
                print(f"  no suitable image found")
                continue
            suffix = Path(urllib.parse.urlparse(image["url"]).path).suffix or ".img"
            raw = TMP / f"{Path(filename).stem}{suffix}"
            download(image["url"], raw)
            convert_to_jpeg(raw, IMAGES / filename)
            credits[filename] = image
            CREDITS.write_text(json.dumps(credits, ensure_ascii=False, indent=2), encoding="utf-8")
            print(f"  saved {filename} from {image['title']}")
        except Exception as exc:
            print(f"  skipped after error: {exc}")
        time.sleep(2.0)

    for target, source in DAY_SOURCE.items():
        source_path = IMAGES / source
        if source_path.exists():
            shutil.copyfile(source_path, IMAGES / target)
            credits[target] = {**credits.get(source, {}), "derived_from": source}

    CREDITS.write_text(json.dumps(credits, ensure_ascii=False, indent=2), encoding="utf-8")
    shutil.rmtree(TMP)
    print(f"credits: {CREDITS}")


if __name__ == "__main__":
    main()
