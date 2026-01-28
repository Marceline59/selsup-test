import React, { useRef } from "react"

interface Param {
  id: number
  name: string
  type: string
}

interface ParamValue {
  paramId: number
  value: string
}

interface Model {
  paramValues: ParamValue[]
}

interface Props {
  params: Param[]
  model: Model
}

interface State {
  paramValues: Map<number, string>
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    const paramValues = new Map<number, string>()

    props.model.paramValues.forEach((pv) => {
      paramValues.set(pv.paramId, pv.value)
    })

    props.params.forEach((param) => {
      if (!paramValues.has(param.id)) {
        paramValues.set(param.id, "")
      }
    })

    this.state = {
      paramValues,
    }
  }

  public getModel(): Model {
    const paramValues: ParamValue[] = []

    this.state.paramValues.forEach((value, paramId) => {
      paramValues.push({
        paramId,
        value,
      })
    })

    return { paramValues }
  }

  handleChange = (paramId: number, value: string) => {
    this.setState((prevState) => {
      const newParamValues = new Map(prevState.paramValues)
      newParamValues.set(paramId, value)
      return { paramValues: newParamValues }
    })
  }

  render() {
    const { params } = this.props

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {params.map((p) => (
          <div key={p.id} style={{ display: "flex", gap: "10px" }}>
            <label style={{ width: "150px" }}>{p.name}</label>
            <input
              type="text"
              value={this.state.paramValues.get(p.id) || ""}
              onChange={(e) => this.handleChange(p.id, e.target.value)}
              style={{ width: "200px" }}
            />
          </div>
        ))}
      </div>
    )
  }
}

function App() {
  const params: Param[] = [
    {
      id: 1,
      name: "Назначение",
      type: "string",
    },
    {
      id: 2,
      name: "Длина",
      type: "string",
    },
  ]

  const model: Model = {
    paramValues: [
      {
        paramId: 1,
        value: "повседневное",
      },
      {
        paramId: 2,
        value: "макси",
      },
    ],
  }

  const editorRef = useRef<ParamEditor>(null)

  const handleGetModel = () => {
    if (editorRef.current) {
      const model = editorRef.current.getModel()
      alert(JSON.stringify(model))
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Редактор параметров</h2>
      <ParamEditor ref={editorRef} params={params} model={model} />
      <button
        onClick={handleGetModel}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Получить модель
      </button>
    </div>
  )
}

export default App
