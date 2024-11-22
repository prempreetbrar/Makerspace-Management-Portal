import React from "react"

interface ConditionalWrapperProps
{
    displayCondition: boolean,
    children: React.ReactNode,
}
const ConditionalWrapper = ({displayCondition, children}:ConditionalWrapperProps)=>
{
    if(displayCondition)
    {
        return(<>{children}</>)
    }
    else return(<></>);
}
export default ConditionalWrapper;