import * as React from 'react';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
} from '@material-ui/data-grid';
import {
  Button,
  createStyles,
  makeStyles,
  Menu,
  MenuItem,
  Paper,
  Theme,
} from '@material-ui/core';
import map from '../../../../utils/map';
import axios from 'axios';
import useSWR from 'swr';
import api from '../../../../utils/api';

interface Iuser {
  name: string;
  username: string;
  email: string;
  id?: any;
  _id?: any;
}

interface IBerringTable {
  dataValues: Array<Iuser>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    BettingTabel: {
      backgroundColor: 'white',
    },
  })
);
const remove = async (id) => {
  await axios
    .delete(`/api/user/?id=${id}`)
    .then(function (resp) {
      return resp;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Nome',
    width: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 300,
  },
  {
    field: 'username',
    headerName: 'Nome de Usuario',
    width: 200,
  },
  {
    field: '',
    renderCell: (params: GridCellParams) => {
      return <Button onClick={() => remove(params.row.id)}>Apagar</Button>;
    },
  },
];
const BettingTabel: React.FC<IBerringTable> = (props: IBerringTable) => {
  const classes = useStyles();
  const { data, error } = useSWR('/api/user', axios);

  let rows: any = !data
    ? []
    : data.data.sucess.data.map((item) => {
        item.id = item._id;
        delete item._id;
        return item;
      });
  const [view, setView] = React.useState({});

  const setValue = (props: any) => {
    setView((oldValues: any) => {
      return {
        ...oldValues,
        ...props,
      };
    });
  };

  return (
    <div>
      {/* <div onContextMenu={handleClick} style={{ cursor: 'context-menu' }}> */}
      <Paper
        style={{
          height: '80vh',
          width: '100%',
          marginTop: '20px',
          backgroundColor: 'white',
        }}
      >
        <DataGrid
          className={classes.BettingTabel}
          rows={rows}
          columns={columns}
          pageSize={10}
          // checkboxSelection
        />
      </Paper>
    </div>
  );
};

export default BettingTabel;
