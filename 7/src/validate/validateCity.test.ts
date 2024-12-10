import { validateCityName } from './validateCity.ts';
import { errors } from '../utils/dictionarty.ts';

describe('validateCityName', () => {
  it('Валидная строка проходит валидацию', () => {
    const city_valid = 'Moscow'
    const result_valid = validateCityName(city_valid)

    expect(result_valid.isValid).toBeTruthy()
    expect(result_valid.message).toBe(errors.city.valid)
  })

  it('Пустая строка не проходит валидацию', () => {
    const city_empty = ''
    const result_empty = validateCityName(city_empty)

    expect(result_empty.isValid).toBeFalsy()
    expect(result_empty.message).toBe(errors.city.required)
  })

  it('Строка с недопустимыми символами не проходит валидацию', () => {
    const city_tick = `Moscow'`
    const result_tick = validateCityName(city_tick)

    expect(result_tick.isValid).toBeFalsy()
    expect(result_tick.message).toBe(errors.city.invalid)

    const city_colon = `Moscow:`
    const result_colon = validateCityName(city_colon)

    expect(result_colon.isValid).toBeFalsy()
    expect(result_colon.message).toBe(errors.city.invalid)

    const city_bracket = `Moscow)`
    const result_bracket = validateCityName(city_bracket)

    expect(result_bracket.isValid).toBeFalsy()
    expect(result_bracket.message).toBe(errors.city.invalid)
  })

  it('Строка с экранируемыми символами не проходит валидацию; валидатор выдает предупреждение', () => {
    const city_arrow = `Moscow<`
    const result_arrow = validateCityName(city_arrow)

    expect(result_arrow.isValid).toBeFalsy()
    expect(result_arrow.message).toBe(errors.city.escape)

    const city_amp = `Moscow&`
    const result_amp = validateCityName(city_amp)

    expect(result_amp.isValid).toBeFalsy()
    expect(result_amp.message).toBe(errors.city.escape)

    const city_quotes = `Moscow"`
    const result_quotes = validateCityName(city_quotes)

    expect(result_quotes.isValid).toBeFalsy()
    expect(result_quotes.message).toBe(errors.city.escape)
  })

  it('Валидация города пропускает название с восклицательным знаком или дефисами', () => {
    const city_exclamation = `Saint-Louis-du-Ha! Ha!`
    const result_exclamation = validateCityName(city_exclamation)

    expect(result_exclamation.isValid).toBeTruthy()
    expect(result_exclamation.message).toBe(errors.city.valid)

    const city_hyphen = `Saint-Louis`
    const result_hyphen = validateCityName(city_hyphen)

    expect(result_hyphen.isValid).toBeTruthy()
    expect(result_hyphen.message).toBe(errors.city.valid)
  })

  it('Валидация города пропускает название со спецсимволами', () => {
    const city_special = `Ağrı`
    const result_special = validateCityName(city_special)

    expect(result_special.isValid).toBeTruthy()
    expect(result_special.message).toBe(errors.city.valid)
  })

  it('Валидация города пропускает название из одной буквы', () => {
    const city_single_letter = `A`
    const result_single_letter = validateCityName(city_single_letter)

    expect(result_single_letter.isValid).toBeTruthy()
    expect(result_single_letter.message).toBe(errors.city.valid)
  })
});