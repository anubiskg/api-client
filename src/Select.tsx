import React, {useState} from 'react';
import countries from "./countries.json";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import ReactJson from 'react-json-view';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }),
);

export default function ControlledOpenSelect() {

  const classes = useStyles();
  const baseUrl = "https://localhost:5001/api/newsweather/";
  const [country, setCountry] = React.useState<string>('');
  const [open, setOpen] = React.useState(false);
  const [dataCheck, setDataCheck] = useState([]);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCountry(event.target.value as string);
  };

  const peticionGetCheck = async () => {
    await axios.get(baseUrl + country)
      .then(response => {
        setDataCheck(response.data);
      }).catch(error => {
        setDataCheck(error.data);
      })
  }

  function validate(){
    console.log(country);
    if (country === undefined || country === ''){
      alert("Select a country required");
    }else{
      peticionGetCheck();
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="select-label">Country</InputLabel>
        <Select
          labelId="select-label"
          id="open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={country}
          onChange={handleChange}
          required={true}
        >
          <MenuItem>
          <option>Select any</option>
          </MenuItem>
          {
            countries.countries.map((result: any) => (<option value={result.code}>{result.name_en}</option>))
          }
        </Select>
      </FormControl>
      <hr></hr>
          <Button id="getButton" onClick={() => validate()}>Get</Button>
          <hr></hr>
          <div id="global">
            <div id="text">
              <ReactJson src={dataCheck} theme="monokai" collapsed={true}/>
            </div>
          </div>
    </div>
  );
}
