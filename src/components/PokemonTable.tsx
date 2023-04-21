import React from 'react';
import startCase from 'lodash/startCase';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
	Icon,
} from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { makeStyles } from '@mui/styles';

import { ITableEntry } from '../models/interfaces';

import FavoriteIcon from './FavoriteIcon';

interface IProps {
	rows: ITableEntry[];
	rowsPerPage: number;
	page: number;
	searchMode: boolean;
	onFavorite: (name: string) => void;
	onClick: (v: string) => void;
	onPageChange: (_: any, newPage: number) => void;
	onRowsPerPageChange: (event: any) => void;
}

const useStyles = makeStyles({
	row: {
		transition: 'box-shadow 0.2s ease',
		'&:hover': {
			boxShadow:
				'rgb(0 0 0 / 16%) 0px 0px 12px 0px, rgb(0 0 0 / 6%) 0px 0px 0px 1px',
			cursor: 'pointer',
		},
	},
	nodata: {
		display: 'grid',
		placeContent: 'center',
		textAlign: 'center',
		height: '100%',
	},
});

export default function PokemonTable(props: IProps) {
	const classes = useStyles();
	const { rows, rowsPerPage, page, onPageChange, onRowsPerPageChange } = props;

	if (rows.length === 0)
		return (
			<div className={classes.nodata}>
				<Icon sx={{ fontSize: 100 }}>folder_off</Icon>
				<Typography>No data found</Typography>
			</div>
		);

	return (
		<TableContainer>
			<Table
				stickyHeader={true}
				sx={{ minWidth: 500 }}
				aria-label="custom pagination table"
			>
				<TableHead>
					<TableRow>
						<TableCell align={'center'}>ID</TableCell>
						<TableCell>Name</TableCell>
						<TableCell align={'right'}>Favorite</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{(!props.searchMode && rowsPerPage > 0
						? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: rows
					).map((row) => (
						<TableRow
							key={row.name}
							className={classes.row}
							onClick={() => props.onClick(row.id)}
						>
							<TableCell
								component="th"
								scope="row"
								width={256}
								align={'center'}
							>
								#{row.id}
							</TableCell>
							<TableCell component="th" scope="row">
								{startCase(row.name)}
							</TableCell>
							<TableCell component="th" scope="row" align={'right'}>
								<FavoriteIcon
									favorite={row.favorite}
									onToggle={() => props.onFavorite(row.name)}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				{!props.searchMode && rows.length > rowsPerPage && (
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[10, 15, 20, 30, 40, 50]}
								colSpan={3}
								count={rows.length}
								rowsPerPage={props.searchMode ? -1 : rowsPerPage}
								page={page}
								SelectProps={{
									native: true,
								}}
								onPageChange={onPageChange}
								onRowsPerPageChange={onRowsPerPageChange}
								ActionsComponent={TablePaginationActions}
							/>
						</TableRow>
					</TableFooter>
				)}
			</Table>
		</TableContainer>
	);
}
