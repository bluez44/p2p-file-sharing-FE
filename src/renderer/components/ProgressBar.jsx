import React, { useEffect } from 'react'

export default function ProgressBar({ status = 'error', width = '100' }) {

  const [progress, setProgress] = React.useState(0)

  useEffect(() => { 
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 20
        return Math.min(oldProgress + diff, 100)
      })
    }, 500)
    return () => clearInterval(interval)
  }, [])

  if (status === 'done')  
    return (
        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar bg-success" style={{width: `${progress}%`}}></div>
        </div>
    )

  if (status === 'upload' || status === 'download') 
    return (
        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar bg-primary" style={{width: `${progress}%`}}></div>
        </div>
    )

  if (status === 'error') 
    return (
        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar bg-danger" style={{width: `${progress}%`}}></div>
        </div>
    )
  
  if (status === 'ready')
    return (
        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar bg-none" style={{width: `${progress}%`}}></div>
        </div>
    )
}
