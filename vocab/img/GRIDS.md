# Генерация сеток картинок через Recraft (инструкция для исполнителя)

Инструменты: ToolSearch `select:mcp__Recraft__generate_image`. Пользователь оплатил тариф Recraft Basic; одна сетка ≈ 10 кредитов.

Для сетки номер N курса C (en: 0–14, ja: 0–24):
1. `cd /home/user/Claude-/vocab/img && python3 prompt.py C N > grids/C-N.json` — поля `prompt` и `ids` (20 id по порядку).
2. `mcp__Recraft__generate_image`: model `gpt_image_2p5_flare`, image_size `5:4`, prompt = поле prompt из файла ДОСЛОВНО.
3. Скачать полное изображение: `curl -f -sSL -o grids/C-N.png "<image_urls[0] из ответа>"` (это WEBP, расширение .png не мешает).
4. Посмотреть картинку (Read grids/C-N.png). Брак, если: есть надписи/подписи/цифры; сетка не 5×4; порядок перепутан (тайл не соответствует своему описанию). При браке — повторить (максимум 1 повтор), лучший вариант оставить как grids/C-N.png.
5. Нарезать: `python3 crop.py grids/C-N.png C $(python3 -c "import json;print(' '.join(json.load(open('grids/C-N.json'))['ids']))")` → `C/<id>.webp`. Убедиться, что появилось 20 новых файлов и что в выводе cuts примерно равные шаги (~225 px).
6. Если Recraft отвечает ошибкой лимита/кредитов — остановиться и сообщить, на какой сетке.
7. В отчёте: готовые сетки, повторы, спорные тайлы (id и что не так).
