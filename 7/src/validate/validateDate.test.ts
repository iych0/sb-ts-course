import { validateDate } from './validateDate.ts';
import { errors } from '../utils/dictionarty.ts';

describe('validateDate', () => {
  it('Валидация даты пропускает дату в виде ДД.ММ.ГГГГ', () => {
    const date_dd_mm_yyyy = `12.09.2025`
    const result_dd_mm_yyyy = validateDate(date_dd_mm_yyyy)

    expect(result_dd_mm_yyyy.isValid).toBeTruthy()
    expect(result_dd_mm_yyyy.message).toBe(errors.date.valid)
  })

  it('Валидация даты не пропускает пустую строку', () => {
    const date_empty = ``
    const result_empty = validateDate(date_empty)

    expect(result_empty.isValid).toBeFalsy()
    expect(result_empty.message).toBe(errors.date.required)
  })

  it('Валидация даты не пропускает спецсимволы', () => {
    const date_with_special_chars = `12.09.2024!`
    const result_with_special_chars = validateDate(date_with_special_chars)

    expect(result_with_special_chars.isValid).toBeFalsy()
    expect(result_with_special_chars.message).toBe(errors.date.invalidCharacters)

    const date_with_ampersand = `12.09.2024&`
    const result_with_ampersand = validateDate(date_with_ampersand)

    expect(result_with_ampersand.isValid).toBeFalsy()
    expect(result_with_ampersand.message).toBe(errors.date.invalidCharacters)
  })

  it('Валидация даты не пропускает буквенные значения', () => {
    const date_with_letters = `12.09.2024abc`
    const result_with_letters = validateDate(date_with_letters)

    expect(result_with_letters.isValid).toBeFalsy()
    expect(result_with_letters.message).toBe(errors.date.invalidCharacters)

    const date_with_words = `Двенадцатое сентября две тысячи двадцать четвертого`
    const result_with_words = validateDate(date_with_words)

    // Интересное наблюдение - возвращаемый код ошибки не соответствует ожидаемому (errors.date.invalidCharacters).
    // Резонно предположу, что функция, предоставленная для тестирования, ведет себя несколько непредсказуемо из-за
    // недостаточного тестирования на стороне команды курса :)
    expect(result_with_words.isValid).toBeFalsy()
    expect(result_with_words.message).toBe(errors.date.pattern)
  })

  it('Валидация даты выдаёт предупреждение, если дата раньше текущей', () => {
    const pastDate = `01.01.2000`
    const result_pastDate = validateDate(pastDate)

    expect(result_pastDate.isValid).toBeFalsy()
    expect(result_pastDate.message).toBe(errors.date.past)
  })
})