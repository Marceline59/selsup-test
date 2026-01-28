import { act, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ParamEditor, type Model } from './App'
import { useEffect, useRef } from 'react'

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

  test('корректный результат getModel() после изменений', async () => {
    let editorRef: ParamEditor | null = null

    const TestComponent = () => {
      const ref = useRef<ParamEditor>(null)

      useEffect(() => {
        editorRef = ref.current
      }, [])

      return <ParamEditor ref={ref} params={mockParams} model={mockModel} />
    }

    render(<TestComponent />)

    const input1 = screen.getByLabelText('Назначение') as HTMLInputElement

    act(() => {
      fireEvent.change(input1, { target: { value: 'офисное' } })
    })

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(editorRef).not.toBeNull()

    const model: Model = editorRef!.getModel()
    expect(model).toBeDefined()
  
    const param1 = model.paramValues.find((p) => p.paramId === 1)
    expect(param1?.value).toBe('офисное')
  })
})