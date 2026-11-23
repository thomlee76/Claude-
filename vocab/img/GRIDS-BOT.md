# Японские картинки в стиле бота JLPT N5 через Figma (по 2 панели в файле) — задание исполнителю

Figma: fileKey `lpMgAOC6Ub1XGgoIbLFb4K`, sessionId `d966d17b-e5ee-4ee3-b13c-4e2fa6dd27c0`. Инструмент: ToolSearch `select:mcp__Figma__generate_image`.
Образцы стиля (как должно выглядеть): /home/user/Claude-/vocab/img/ja/j04-10.webp, ja/j09-01.webp (картинки бота), ja-bot/j01-24.webp, ja-bot/j01-25.webp (уже сделанная пара 1).

Для каждой пары N из вашего диапазона:
1. `cd /home/user/Claude-/vocab/img && python3 prompt_bot.py N > grids-bot/bot-NN.json` (NN — двузначный номер). Поля: prompt, ids (2 id), width, height.
2. `mcp__Figma__generate_image`: fileKey и sessionId выше, model `gpt-image-2.5-flare`, width 1024, height 1536, prompt — поле prompt ДОСЛОВНО.
3. Сразу скачать: `curl -f -sSL -o grids-bot/bot-NN.png "<image.url>"`.
4. Посмотреть картинку (Read). Брак, если: не 2 панели одна над другой; есть надписи, буквы, цифры, иероглифы, пузыри речи; панель не соответствует своему описанию; стиль заметно отличается от образцов (плоский/гладкий, пастельный, не кинематографичный). При браке — один повтор, оставить лучший вариант.
5. Нарезать: `python3 crop_panels.py grids-bot/bot-NN.png ja-bot <id1> <id2>`. Проверить, что вывод показывает 2 панели и размер ~998×648.
6. Ошибка Figma про лимит/кредиты/доступ — один повтор, потом остановиться и сообщить номер пары.
7. Не коммитить, не трогать чужие пары. Вспомогательные файлы — только в своей подпапке scratchpad.

Отчёт (коротко): готовые пары, повторы, спорные картинки (id и что не так), где остановились.
