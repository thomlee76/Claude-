# Генерация сеток картинок (инструкция для исполнителя)

Для сетки номер N курса C (en: 0–14, ja: 0–24):
1. `cd /home/user/Claude-/vocab/img && python3 prompt.py C N > grids/C-N.json` — в файле поля `prompt` и `ids` (20 id по порядку).
2. Вызвать инструмент Replicate `create_models_predictions`: model_owner `google`, model_name `nano-banana`, header `Prefer: wait=60`,
   input = {"prompt": <prompt из файла дословно>, "aspect_ratio": "5:4", "output_format": "png"}, jq_filter `{id,status,output,error}`.
   Если статус не succeeded — дождаться через `get_predictions`.
3. Скачать: `curl -sS -o grids/C-N.png "<output url>"`.
4. Посмотреть картинку (Read grids/C-N.png). Брак, если: под или на картинках есть надписи/подписи/цифры; сетка не 5×4; порядок явно перепутан (тайл не соответствует своему описанию). При браке — сгенерировать ещё раз (максимум 2 повтора), лучший вариант сохранить как grids/C-N.png.
5. Нарезать: `python3 crop.py grids/C-N.png C $(python3 -c "import json;print(' '.join(json.load(open('grids/C-N.json'))['ids']))")`
   — получатся `C/<id>.webp`. Проверить, что появилось 20 файлов.
6. В отчёте перечислить сетки, число повторов и тайлы, которые остались спорными (id и что не так).
