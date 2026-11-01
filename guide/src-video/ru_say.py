"""Подготовка текста озвучки для Silero: латиница → кириллица (Silero читает только кириллицу)."""
import re

LAT = {
    'Claude Code': 'Клод Код', 'Claude': 'Клод', 'Code': 'Код', 'Google Docs': 'Гугл Докс', 'Google': 'Гугл',
    'Research': 'Ресёрч', 'PDF': 'пэ-дэ-эф', 'Excel': 'Эксель', 'Remote Control': 'Ремоут Контрол', 'Remote': 'Ремоут',
    'Control': 'Контрол', 'PowerPoint': 'Пауэрпойнт', 'Docs': 'Докс', 'Gmail': 'Джимейл', 'Chrome': 'Хром',
    'for': 'фор', 'in': 'ин', 'Slides': 'Слайдс', 'Word': 'Ворд', 'Design': 'Дизайн', 'Workspace': 'Воркспейс',
    'GitHub': 'Гитхаб', 'ECOUNT': 'Иикаунт', 'Drive': 'Драйв', 'Markdown': 'Маркдаун', 'Dashboard': 'Дашборд',
    'SG Healthcare': 'Эс-Джи Хелскеа', 'SG': 'Эс-Джи', 'Healthcare': 'Хелскеа', 'Sheets': 'Шитс', 'Motion': 'Моушн',
    'Max': 'Макс', 'Team': 'Тим', 'Enterprise': 'Энтерпрайз', 'FastCampus': 'Фасткампус', 'CarPlay': 'Карплей',
    'Legal': 'Лигал', 'Financial': 'Файненшл', 'Advisors': 'Эдвайзорс', 'Marketplace': 'Маркетплейс', 'Open': 'Оупен',
    'IT': 'ай-ти', 'Spotify': 'Спотифай', 'Indeed': 'Индид', 'Figma': 'Фигма', 'Jumong': 'Джумонг',
    'Dominus': 'Доминус', 'Rayence': 'Рэйенс', 'TypeScript': 'Тайпскрипт',
}
_keys = sorted(LAT, key=len, reverse=True)
_rx = re.compile(r'(?<![A-Za-z])(' + '|'.join(re.escape(k) for k in _keys) + r')(?![A-Za-z])')

def ru(text):
    t = _rx.sub(lambda m: LAT[m.group(1)], text)
    t = t.replace('—', ',').replace('«', '').replace('»', '').replace('…', '.')
    left = re.findall(r'[A-Za-z]+', t)
    if left:
        raise ValueError('нет транслитерации: ' + ', '.join(sorted(set(left))))
    return t
