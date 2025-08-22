import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const EngineDisplay = ({ data }) => {
  const { engine } = data

  const EngineGauge = ({ label, value, max, unit, color = "green" }) => {
    const percentage = (value / max) * 100
    const colorClass = color === "green" ? "bg-green-500" : color === "yellow" ? "bg-yellow-500" : "bg-red-500"
    
    return (
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-300 mb-1">
          <span>{label}</span>
          <span>{value.toFixed(1)} {unit}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${colorClass}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0</span>
          <span>{max}</span>
        </div>
      </div>
    )
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-blue-400 text-center">Engine Parameters</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Engine 1 */}
          <div className="bg-gray-900 rounded-lg p-4">
            <h3 className="text-center text-lg font-semibold text-cyan-400 mb-4">ENGINE 1</h3>
            
            <EngineGauge 
              label="N1" 
              value={engine.n1[0]} 
              max={100} 
              unit="%" 
              color={engine.n1[0] > 95 ? "red" : engine.n1[0] > 85 ? "yellow" : "green"}
            />
            
            <EngineGauge 
              label="N2" 
              value={engine.n2[0]} 
              max={100} 
              unit="%" 
              color={engine.n2[0] > 95 ? "red" : engine.n2[0] > 90 ? "yellow" : "green"}
            />
            
            <EngineGauge 
              label="EGT" 
              value={engine.egt[0]} 
              max={900} 
              unit="°C" 
              color={engine.egt[0] > 750 ? "red" : engine.egt[0] > 650 ? "yellow" : "green"}
            />
            
            <EngineGauge 
              label="FF" 
              value={engine.fuelFlow[0]} 
              max={5000} 
              unit="PPH" 
              color="green"
            />
          </div>
          
          {/* Engine 2 */}
          <div className="bg-gray-900 rounded-lg p-4">
            <h3 className="text-center text-lg font-semibold text-cyan-400 mb-4">ENGINE 2</h3>
            
            <EngineGauge 
              label="N1" 
              value={engine.n1[1]} 
              max={100} 
              unit="%" 
              color={engine.n1[1] > 95 ? "red" : engine.n1[1] > 85 ? "yellow" : "green"}
            />
            
            <EngineGauge 
              label="N2" 
              value={engine.n2[1]} 
              max={100} 
              unit="%" 
              color={engine.n2[1] > 95 ? "red" : engine.n2[1] > 90 ? "yellow" : "green"}
            />
            
            <EngineGauge 
              label="EGT" 
              value={engine.egt[1]} 
              max={900} 
              unit="°C" 
              color={engine.egt[1] > 750 ? "red" : engine.egt[1] > 650 ? "yellow" : "green"}
            />
            
            <EngineGauge 
              label="FF" 
              value={engine.fuelFlow[1]} 
              max={5000} 
              unit="PPH" 
              color="green"
            />
          </div>
        </div>
        
        {/* Engine Summary */}
        <div className="mt-6 bg-gray-900 rounded-lg p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-300">TOTAL FF</div>
              <div className="text-xl font-mono text-green-400">
                {(engine.fuelFlow[0] + engine.fuelFlow[1]).toFixed(0)} PPH
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-300">AVG N1</div>
              <div className="text-xl font-mono text-green-400">
                {((engine.n1[0] + engine.n1[1]) / 2).toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-300">AVG EGT</div>
              <div className="text-xl font-mono text-green-400">
                {((engine.egt[0] + engine.egt[1]) / 2).toFixed(0)}°C
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-300">STATUS</div>
              <div className="text-xl font-mono text-green-400">NORMAL</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default EngineDisplay

