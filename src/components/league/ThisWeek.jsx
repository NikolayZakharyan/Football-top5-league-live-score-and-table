import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import moment from 'moment';
import { FormatClearSharp } from '@material-ui/icons';

const rows = [
  createData(`TEAT A - TEAM B`, 'date', 'starting time', 'stadium'),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
];

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(game, date, time, stadium, homeScore, awayScore) {
  // const dateTimeAgo = moment("2020-04-04 11:45:26.123").fromNow('minutes')

  [date, time] = new Date(date + ' ' + time + 'Z').toLocaleString().split(',');

  // console.log([date, time]);

  const dateB = moment();
  const dateC = moment(date + time);

  let liveTime = dateB.diff(dateC, 'minutes');

  if(liveTime > 45) liveTime-=15

  if (liveTime > 1 && liveTime < 91) console.log(liveTime);

  // console.log('Difference is ', dateB.diff(dateC,'minutes'), 'minutes');

  // console.log(time);

  return {
    game,
    date,
    time,
    carbs: stadium,
    history: [
      {
        customerId: game.split('vs')[0],
        amount: homeScore ? homeScore : 'match dont start',
      },
      {
        customerId: game.split('vs')[1],
        amount: awayScore ? awayScore : 'match dont start',
      },
    ],
  };
}

function Row(props) {
  //   console.log(props.games);
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.game}
        </TableCell>
        <TableCell align="right">{row.date}</TableCell>
        <TableCell align="right">{row.time}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>Date</TableCell> */}
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow, i) => {
                    // console.log(historyRow);

                    return (
                      <TableRow key={i}>
                        {/* <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell> */}
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell align="right">{historyRow.amount}</TableCell>
                        {/* <TableCell align="right">
                          {Math.round(historyRow.amount * row.price * 100) /
                            100}
                        </TableCell> */}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    // date: PropTypes.number.isRequired,
    // carbs: PropTypes.number.isRequired,
    // time: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    game: PropTypes.string.isRequired,
    // protein: PropTypes.number.isRequired,
  }).isRequired,
};

export default function CollapsibleTable(props) {
  const [gamesData, setGamesData] = useState([]);
  const [URL, setURL] = useState(
    'https://www.thesportsdb.com/api/v1/json/1/' + props.url
  );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await fetch(URL);
    const result = await response.json();
    const rows = result.events.map((i) => {
      return createData(
        i.strEvent,
        i.dateEvent,
        i.strTime,
        i.strVenue,
        i.intHomeScore,
        i.intAwayScore
      );
    });
    setGamesData(rows);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>GAMES</TableCell>
            <TableCell align="right">DATE</TableCell>
            <TableCell align="right">TIME</TableCell>
            <TableCell align="right">Stadium</TableCell>
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {gamesData.map((row) => (
            <Row key={row.game} row={row} games={gamesData} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
