#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Скачивает шрифты Google Fonts в docs/fonts и пишет docs/fonts.css.

Приложение не обращается к fonts.googleapis.com: шрифты лежат рядом, поэтому
работают офлайн и не тянут внешних запросов. Оставляем только подмножества
latin, latin-ext, cyrillic, cyrillic-ext — греческий и вьетнамский не нужны.
Корейский берётся из системного шрифта iOS.
"""
import os, re, ssl, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KEEP = ("latin", "latin-ext", "cyrillic", "cyrillic-ext")
FAMILIES = ("Unbounded:wght@600;700"
            "&family=Golos+Text:wght@400;500;600;700"
            "&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600")
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")   # за старый UA отдадут ttf


def opener():
    ctx = ssl.create_default_context(cafile="/root/.ccr/ca-bundle.crt") \
        if os.path.exists("/root/.ccr/ca-bundle.crt") else ssl.create_default_context()
    proxy = os.environ.get("HTTPS_PROXY") or os.environ.get("https_proxy")
    handlers = [urllib.request.HTTPSHandler(context=ctx)]
    if proxy:
        handlers.insert(0, urllib.request.ProxyHandler({"https": proxy, "http": proxy}))
    op = urllib.request.build_opener(*handlers)
    op.addheaders = [("User-Agent", UA)]
    return op


def main():
    op = opener()
    css = op.open("https://fonts.googleapis.com/css2?family=" + FAMILIES + "&display=swap",
                  timeout=60).read().decode()
    out_dir = os.path.join(ROOT, "docs/fonts")
    os.makedirs(out_dir, exist_ok=True)

    blocks, files = [], {}
    for block in re.findall(r"/\*[^*]*\*/\s*@font-face\s*\{[^}]*\}", css):
        subset = re.search(r"/\*\s*([^*]+?)\s*\*/", block).group(1)
        if subset not in KEEP:
            continue
        family = re.search(r"font-family:\s*'([^']+)'", block).group(1)
        weight = re.search(r"font-weight:\s*([^;]+);", block).group(1).strip()
        src = re.search(r"url\((https://[^)]+\.woff2)\)", block).group(1)
        name = "%s-%s-%s.woff2" % (family.replace(" ", ""), weight.replace(" ", "_"), subset)
        files.setdefault(name, op.open(src, timeout=60).read())
        blocks.append(block.replace(src, "fonts/" + name))

    for stale in os.listdir(out_dir):
        if stale not in files:
            os.remove(os.path.join(out_dir, stale))
    for name, data in files.items():
        open(os.path.join(out_dir, name), "wb").write(data)

    open(os.path.join(ROOT, "docs/fonts.css"), "w", encoding="utf-8").write(
        "/* Шрифты лежат рядом с приложением: офлайн работают, внешних запросов нет. */\n"
        "/* Пересобрать: tools/fetch-fonts.py */\n\n" + "\n\n".join(blocks) + "\n")
    kb = sum(len(d) for d in files.values()) // 1024
    print("docs/fonts — %d файлов, %d КБ" % (len(files), kb))


if __name__ == "__main__":
    main()
