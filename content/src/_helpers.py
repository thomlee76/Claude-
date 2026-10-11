# -*- coding: utf-8 -*-
"""Хелперы для файлов с содержанием уроков."""

def E(en, ru, ko):
    """Пример: английская фраза + два перевода."""
    return {"en": en, "ru": ru, "ko": ko}

def D(s, en, ru, ko, you=False):
    """Реплика диалога. you=True — реплика, которую произносит ученик."""
    d = {"s": s, "en": en, "ru": ru, "ko": ko}
    if you:
        d["you"] = True
    return d

def N(ru, ko):
    """Пояснение: русский и корейский вариант."""
    return {"ru": ru, "ko": ko}

def BUILD(ru, ko, answer, extra):
    """Задание «собрать предложение»."""
    return {"type": "build", "ru": ru, "ko": ko, "answer": answer, "extra": extra}

def PICK(q_ru, q_ko, right, wrong, why_ru, why_ko):
    """Задание «что звучит естественно»."""
    return {"type": "pick", "q_ru": q_ru, "q_ko": q_ko,
            "options": [{"en": right, "ok": True}, {"en": wrong, "ok": False}],
            "why": N(why_ru, why_ko)}
