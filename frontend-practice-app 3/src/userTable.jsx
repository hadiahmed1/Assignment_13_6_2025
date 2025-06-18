import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Drawer, TextField, Autocomplete, FormControlLabel, Checkbox, Tooltip, Popover, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import axiosInstance from './axiosInstance';
import FilterForm from './component/FilterForm';
import { useNavigate } from 'react-router-dom';
import FilmInfo from './component/FilmInfo';

export default function UserTable() {
  const [open, setOpen] = useState(false);
  const [filmId, setFilmID] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    sort: "desc",
    sortby: "length",
    category: "Comedy",
    language: "English",
    min_length: 0,
    max_length: 160
  })
  const observer = useRef(null);

  const navigate = useNavigate();
  const lastFilmRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prev => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const getFilms = async (currentPage) => {
    setLoading(true);
    try {
      const data = filter;
      const res = await axiosInstance.post(`/films/${currentPage}`, data);
      console.log(res.data.data);

      const newFilms = res.data.data.films;
      if (newFilms.length < 10) setHasMore(false);
      if (currentPage === 1)
        setFilms(newFilms);
      else
        setFilms(prev => [...prev, ...newFilms]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("effect")
    getFilms(page);
  }, [page, filter]);


  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const toggleFilter = (filterState) => () => {
    setOpenFilter(filterState);
  };

  const [createdDateValue, setCreatedDateValue] = React.useState(dayjs());

  // const [selectedOptions, setSelectedOptions] = useState([]);

  const options = ['Rohit Sharma', 'Karan Mehta', 'Shiv Roy', 'Amitabh Roy'];

  // const allSelected = selectedOptions.length === options.length;
  // const isIndeterminate =
  //   selectedOptions.length > 0 && selectedOptions.length < options.length;

  // const handleChange = (event, newValue) => {
  //   if (newValue.includes('Select All')) {
  //     if (allSelected) {
  //       setSelectedOptions([]);
  //     } else {
  //       setSelectedOptions([...options]);
  //     }
  //   } else {
  //     setSelectedOptions(newValue.filter(val => val !== 'Select All'));
  //   }
  // };

  const handlePopoverOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowIndex(index);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedRowIndex(null);
  };

  const openPopover = Boolean(anchorEl);

  const handleEdit = () => {
    console.log(`Edit row ${selectedRowIndex + 1}`);
    handlePopoverClose();
  };

  const handleDelete = () => {
    console.log(`Delete row ${selectedRowIndex + 1}`);
    handlePopoverClose();
  };

  return (
    <>
      <div className='heading_holder'>
        <h4 className='heading'>Films</h4>
        <div className='btn_holder'>
          <Button className='cstm_btn' variant="outlined" onClick={toggleFilter(!openFilter)}>
            {!openFilter ? 'Filter' : 'Hide'}
          </Button>
        </div>
      </div>

      {/* filter result form */}
      {openFilter && <div className='filtered_form_holder'>
        <FilterForm setFilter={setFilter} setPage={setPage} />
      </div>}

      {/* table data */}
      <TableContainer component={Paper} sx={{ margin: '0 auto' }}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong> ReleaseYear</strong></TableCell>
              <TableCell><strong>Length</strong></TableCell>
              <TableCell><strong>Rating</strong></TableCell>
              <TableCell
                sx={{
                  width: '50px',
                  minWidth: '50px',
                  maxWidth: '50px',
                  padding: '4px', // Optional: reduces internal padding
                  textAlign: 'center',
                }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {films.map((row, index) => (

              <TableRow ref={(index === films.length - 1) ? lastFilmRef : null}
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? 'rgba(0 ,0, 0, 0.04)' : 'white'
                }}
              >
                <TableCell onClick={() => { setOpen(true); setFilmID(row.film_id) }} className='underline text-blue-600 hover:cursor-pointer'>{row.title}</TableCell>
                <TableCell>{row.release_year}</TableCell>
                <TableCell>{row.length + "min"}</TableCell>
                <TableCell>
                  <div className={`cstm_badge_holder ${row.rating === 'PG' ? 'active' : row.rating === 'R' ? 'rejected' : 'on_hold'}`}>{row.rating}</div>
                </TableCell>
                <TableCell
                  sx={{
                    width: '50px',
                    minWidth: '50px',
                    maxWidth: '50px',
                    padding: '4px', // Optional: reduces internal padding
                    textAlign: 'center',
                  }}
                >
                  <span className='icon_holder' onClick={(e) => handlePopoverOpen(e, index)}>
                    <MoreVertIcon />
                  </span>

                  <Popover
                    id="long-menu"
                    open={openPopover && selectedRowIndex === index}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <MenuItem
                      onClick={handleEdit}
                      sx={{
                        fontSize: '12px',
                        px: 2,
                        py: 1,
                        '&:hover': {
                          backgroundColor: '#e3f2fd',
                          color: '#1976d2',
                        }
                      }}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={handleDelete}
                      sx={{
                        fontSize: '12px',
                        px: 2,
                        py: 1,
                        '&:hover': {
                          backgroundColor: '#e3f2fd',
                          color: '#1976d2',
                        }
                      }}
                    >
                      Delete
                    </MenuItem>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* create list form */}
      <Drawer
        className='p-4'
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        slotProps={{
          paper: {
            sx: {
              width: 500
            },
          },
        }}
      >
        <div className='sidebar_content_holder'>
          <div className='heading_holder'>
            <h4 className='heading'>Create New</h4>
            <span className='close_holder' onClick={toggleDrawer(false)}>
              <HighlightOffIcon />
            </span>
          </div>
          <FilmInfo id={filmId} />
          <div className='content_holder'>
            <div className='each_input_holder'>
              <TextField
                id="outlined-password-input"
                className='cstm_textfield'
                label="Name"
                type="text"
                size="small"
                sx={{
                  '& .MuiInputLabel-root': {
                    fontSize: '0.75rem'
                  },
                  '& .MuiInputLabel-shrink': {
                    transform: 'translate(14px, -9px) scale(1)',
                    fontSize: '0.75rem'
                  }
                }}
              />
            </div>

            <div className='each_input_holder'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  value={createdDateValue}
                  onChange={(newValue) => setCreatedDateValue(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: 'small',
                      sx: {
                        '& .MuiInputBase-root': {
                          height: 40,
                        },
                        '& .MuiInputAdornment-root .MuiIconButton-root': {
                          padding: '4px',
                          height: 'auto',
                          width: 'auto',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: '20px',
                        }
                      },
                    }
                  }}
                />
              </LocalizationProvider>
            </div>

            <div className='each_input_holder'>
              <Autocomplete
                multiple
                options={['Select All', ...options]}
                // value={allSelected ? ['Select All', ...options] : selectedOptions}
                disableCloseOnSelect
                // onChange={handleChange}
                renderOption={(props, option, { selected }) => {
                  if (option === 'Select All') {
                    return (
                      <li {...props}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              // indeterminate={isIndeterminate}
                              style={{ padding: 0, marginRight: 8 }}
                              checked={selected}
                            />
                          }
                          label="Select All"
                        />
                      </li>
                    );
                  }
                  return (
                    <li style={{ fontSize: '12px' }} {...props}>
                      <Checkbox
                        style={{ padding: 0, marginRight: 8 }}
                        checked={selected}
                      />
                      {option}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Created By"
                    placeholder="Choose..."
                    size="small"
                    sx={{
                      '& .MuiInputBase-root': {
                        minHeight: '38px',
                        padding: '2px 8px',
                      },
                      '& .MuiInputBase-input': {
                        padding: '6px 0',
                        fontSize: '0.8rem',
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '0.8rem',
                      },
                      '& .MuiInputLabel-shrink': {
                        transform: 'translate(14px, -7px) scale(0.85)',
                      },
                      '& .MuiAutocomplete-tag': {
                        margin: '2px',
                        fontSize: '0.75rem',
                      }
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className='buttons_holder'>
            <Button className='cstm_btn' variant="outlined">Cancel</Button>
            <Button className='cstm_btn' variant="contained">Save</Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}
