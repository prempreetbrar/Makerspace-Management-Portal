import React from 'react'

export interface EquipmentData
{
    id: number, 
    name: string, 
    isPremium: boolean,
    isBookable?: boolean,
    isUnderMaintenance?: boolean,
}

export interface EquipmentContext
{
    equipmentData: EquipmentData | null
    success: boolean,
    setEquipmentData: (data: EquipmentData) => void
    setSuccessState: (successful: boolean) => void
}

export const EquipmentContext = React.createContext<EquipmentContext | null>(null)

export const EquipmentDataProvider = ({children}:{children: React.ReactNode}) =>
{
    const [data, setData] = React.useState<EquipmentData | null>(null);
    const [success, setSuccess] = React.useState(false);
    const setEquipmentData = (newData: EquipmentData)=>
    {
        setData(newData);
    }

    const setSuccessState = (successful: boolean) =>
    {
        setSuccess(successful);
    }

    return(
        <EquipmentContext.Provider value={{equipmentData: data, success: false, setEquipmentData, setSuccessState}}>
            {children}
        </EquipmentContext.Provider>
    );
}