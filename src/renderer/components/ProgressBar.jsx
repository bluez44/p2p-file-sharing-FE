import React, { useEffect } from 'react'

export default function ProgressBar({ status = 'download', width }) {

  // const [progress, setProgress] = React.useState(0)

  // useEffect(() => { 
  //   const interval = setInterval(() => {
  //     setProgress((oldProgress) => {
  //       const diff = Math.random() * 20
  //       return Math.min(oldProgress + diff, 100)
  //     })
  //   }, 500)
  //   return () => clearInterval(interval)
  // }, [])

  console.log('width', width)
  console.log('status', status)

  if (status === 'completed')  
    return (
        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={width} aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar bg-success" style={{width: `${width}%`}}></div>
        </div>
    )

  if (status === 'upload' || status === 'downloading') 
    return (
        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={width} aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar bg-primary" style={{width: `${width}%`}}></div>
        </div>
    )

  if (status === 'error') 
    return (
        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={width} aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar bg-danger" style={{width: `${width}%`}}></div>
        </div>
    )
  
  if (status === 'ready')
    return (
        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={width} aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar bg-none" style={{width: `${width}%`}}></div>
        </div>
    )
}
