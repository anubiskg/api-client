import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

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
  const [country, setCountry] = React.useState<string | number>('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCountry(event.target.value as string);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button className={classes.button} onClick={handleOpen}>
        Select a country:*
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel id="select-label">Country</InputLabel>
        <Select
          labelId="select-label"
          id="open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={country}
          required
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"co"}>Colombia</MenuItem>
          <MenuItem value={"us"}>United States</MenuItem>
          <MenuItem value={"ca"}>Canada</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
