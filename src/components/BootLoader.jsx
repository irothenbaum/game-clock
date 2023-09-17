import React, {useState, useEffect} from 'react'
import './BootLoader.scss'
import useDoOnceTimer from '../hooks/useDoOnceTimer'
import {constructClassString} from '../utilities'

const BOOT_TIME = 3000
const FADE_DURATION = 1000

function BootLoader(props) {
  const {setTimer} = useDoOnceTimer()
  const [isReady, setIsReady] = useState(null)
  const [isFading, setIsFading] = useState(false)
  const [rotationAmount, setRotationAmount] = useState(
    Math.round((Math.random() * 360) / 15) * 15,
  )

  useEffect(() => {
    setIsReady(false)
  }, [])

  useEffect(() => {
    if (typeof isReady === 'boolean' && !isReady) {
      const tick = () => {
        setRotationAmount(r => r + 15)
        setTimer('tick', tick, 1000)
      }
      tick()

      setTimer(
        'boot-loader-fase',
        () => {
          setIsFading(true)
        },
        BOOT_TIME - FADE_DURATION,
      )

      setTimer(
        'boot-loader',
        () => {
          setIsReady(true)
        },
        BOOT_TIME,
      )
    }
  }, [isReady])

  return isReady ? null : (
    <div
      className={constructClassString('boot-loader', {
        loading: typeof isReady === 'boolean' && !isReady,
        fading: isFading,
        ready: isReady,
      })}>
      <div className="boot-loader-content">
        <div className="boot-loader-circle">
          <div
            className="boot-loader-hand"
            style={{transform: `rotateZ(${rotationAmount}deg)`}}
          />
        </div>
        <h1>Game Clock</h1>
      </div>
    </div>
  )
}

BootLoader.propTypes = {}

export default BootLoader
