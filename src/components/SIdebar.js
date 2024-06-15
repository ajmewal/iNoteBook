import React from 'react'

function SIdebar(props) {


    const handleClick = () => {
        props.click === 'none' ? props.setclick('block') : props.setclick('none')

    }

    return (

            <div className='position-relative sidebar'>

               <div>

                    <span onClick={handleClick} class="material-symbols-outlined my-4">
                        edit
                    </span>
               </div>

            </div>
    )
}

export default SIdebar
