import { FormControl, OutlinedInput, Button } from '@mui/material';
import React, {useState} from 'react'
import SearchIcon from '@mui/icons-material/Search'

interface SearchBarProps
{
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>)=>void,
    onSubmit: (text: string)=>void,
}

interface SearchButtonProps
{
    onSubmit: ()=>void
}
const SearchButton = ({onSubmit}:SearchButtonProps)=>
(
    <Button variant='contained' sx={{
        borderRadius: 'inherit',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        }} onClick={onSubmit}><SearchIcon/></Button>
);

const SearchBar = ({value, onChange, onSubmit}:SearchBarProps)=> (
    <FormControl sx={{
        marginTop: 2,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%', 
        borderRadius: 6,
        }} fullWidth>
        <OutlinedInput
            placeholder="Search for equipment..."
            sx={{
                '& .MuiOutlinedInput-root':
                {
                    '& .Mui-focused':
                    {
                        borderStyle: 'solid',
                        borderWidth: 3,
                        borderColor: '#2196f3 !important'
                    },
                },

                borderRadius: 'inherit',
                borderWidth: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
            }}
            value={value}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{onChange(e)}} fullWidth type='text'
        />
        <SearchButton onSubmit={()=>{onSubmit(value)}}/>
    </FormControl>
);

export default SearchBar