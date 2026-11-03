# Генерация сеток картинок через Figma (инструкция для исполнителя)

Файл Figma: fileKey `v7HraUVl0QMBhGkSZFXfwx`. Сначала загрузите инструменты: ToolSearch `select:mcp__Figma__create_session,mcp__Figma__generate_image`,
создайте сессию: `create_session(fileKey, "Generate 5x4 watercolor vocabulary picture grids")` и используйте её sessionId во всех вызовах.

Для сетки номер N курса C (en: 0–14, ja: 0–24):
1. `cd /home/user/Claude-/vocab/img && python3 prompt.py C N > grids/C-N.json` — поля `prompt` и `ids` (20 id по порядку).
2. `generate_image`: fileKey выше, sessionId, model `gpt-image-2.5-flare`, width 2048, height 1638, prompt = поле prompt из файла ДОСЛОВНО.
3. Скачать полное изображение: `curl -f -sSL -o grids/C-N.png "<image.url из ответа>"`.
4. Посмотреть картинку (Read grids/C-N.png). Брак, если: есть надписи/подписи/цифры; сетка не 5×4; порядок перепутан (тайл не соответствует своему описанию). При браке — повторить (максимум 1 повтор), лучший вариант оставить как grids/C-N.png.
5. Нарезать: `python3 crop.py grids/C-N.png C $(python3 -c "import json;print(' '.join(json.load(open('grids/C-N.json'))['ids']))")` → `C/<id>.webp`. Убедиться, что появилось 20 новых файлов и что в выводе cuts примерно равные шаги (~254 px).
6. Если Figma отвечает ошибкой лимита/кредитов — остановиться и сообщить, на какой сетке.
7. В отчёте: готовые сетки, повторы, спорные тайлы (id и что не так).
