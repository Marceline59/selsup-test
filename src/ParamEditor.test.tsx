import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ParamEditor } from './App'

describe('ParamEditor', () => {
  const mockParams = [
    { id: 1, name: 'Назначение', type: 'string' },
    { id: 2, name: 'Длина', type: 'string' }
  ]

  const mockModel = {
    paramValues: [
      { paramId: 1, value: 'повседневное' },
      { paramId: 2, value: 'макси' }
    ]
  }

  test('отображение полей по params', () => {
    render(<ParamEditor params={mockParams} model={mockModel} />)

    expect(screen.getByText('Назначение')).toBeInTheDocument()
    expect(screen.getByText('Длина')).toBeInTheDocument()
  })

  test('корректная инициализация из model.paramValues', () => {
    render(<ParamEditor params={mockParams} model={mockModel} />)

    const input1 = screen.getByLabelText('Назначение') as HTMLInputElement
    const input2 = screen.getByLabelText('Длина') as HTMLInputElement

    expect(input1.value).toBe('повседневное')
    expect(input2.value).toBe('макси')
  })

})