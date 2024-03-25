import { useContext, useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { downloadExcel } from 'react-export-table-to-excel';
import { CSVLink } from 'react-csv';

import {
  ConfigProvider,
  Table,
  Checkbox,
  Dropdown,
  Space,
  Flex,
  Tooltip,
  Select,
  Button,
  message,
  DatePicker,
  Tag,
  FloatButton,
  InputNumber,
} from 'antd';

import * as time from '@/utils/time';
import { ThemeContext } from '@/contexts/ThemeContext';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { IoSearch } from 'react-icons/io5';
import { FaFileCsv } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { LuRefreshCw } from 'react-icons/lu';
import { FaArrowRight } from 'react-icons/fa6';
import { RiToolsFill } from 'react-icons/ri';
import { FaEquals } from 'react-icons/fa6';
import { FaGreaterThanEqual } from 'react-icons/fa6';
import { FaLessThanEqual } from 'react-icons/fa6';
import moment from 'moment';

import './CustomTable.scss';

const lightTheme = {
  token: {
    colorPrimary: '#096dd9',
  },
  components: {
    Table: {
      rowHoverBg: '#f0f5ff',
      headerBg: '#d6e4ff',
      footerBg: '#f0f5ff',
      bodySortBg: '#f0f5ff',
      headerSortHoverBg: '#f0f5ff',
      headerSortActiveBg: '#adc6ff',
    },
  },
};

const darkTheme = {
  token: {
    colorPrimary: '#9254de',
  },
  components: {
    Table: {
      rowHoverBg: 'rgba(110, 17, 217, 0.1)',
      rowSelectedBg: 'rgba(110, 17, 217, 0.2)',
      rowSelectedHoverBg: 'rgba(110, 17, 217, 0.3)',
      headerBg: '#232227',
      bodySortBg: 'rgba(110, 17, 217, 0.1)',
      headerSortHoverBg: 'rgba(110, 17, 217, 0.1)',
      headerSortActiveBg: 'rgba(110, 17, 217, 0.2)',
      colorBgContainer: '#232227',
      borderColor: 'rgba(var(--secondary-rgb), 0.6)',
      colorText: 'var(--gray-400)',
      colorTextHeading: 'var(--gray-300)',
      headerFilterHoverBg: 'var(--gray)',
      headerSplitColor: 'var(--gray)',
      colorIcon: '#adb5bd',
      filterDropdownBg: 'var(--gray)',
      filterDropdownMenuBg: 'var(--gray)',
      footerBg: 'var(--bg-box-dark)',
    },
    Pagination: {
      itemBg: 'var(--bg-box-dark)',
      itemActiveBg: '#432f66',
      colorText: 'var(--primary) !important',
    },
    Input: {
      colorBgContainer: 'var(--gray)',
      colorBorder: 'var(--gray-light)',
      colorText: 'var(--gray-lightest)',
      colorTextPlaceholder: 'var(--gray-light)',
    },
    InputNumber: {
      colorBgContainer: 'var(--gray)',
      colorBorder: 'var(--gray-light)',
      colorText: 'var(--gray-lightest)',
      colorTextPlaceholder: 'var(--gray-light)',
    },
    Dropdown: {
      controlItemBgActive: 'var(--gray-800)',
      controlItemBgHover: 'var(--gray-600)',
      controlItemBgActiveHover: 'var(--gray-600)',
      colorBgTextActive: 'red',
    },
    Checkbox: {
      colorBgContainer: 'var(--gray)',
      colorText: 'var(--gray-light)',
    },
    Select: {
      colorText: 'var(--gray-lighter)',
      controlItemBgActive: 'var(--gray)',
      selectorBg: 'var(--gray)',
      optionSelectedBg: 'var(--gray)',
      controlItemBgHover: 'var(--gray-500)',
      optionActiveBg: 'var(--gray-800)',
      colorBgElevated: 'var(--gray)',
      colorTextPlaceholder: 'var(--gray-light)',
    },
    DatePicker: {
      colorBgContainer: 'var(--gray)',
      colorText: 'var(--gray-lighter)',
      colorTextPlaceholder: 'var(--gray-lighter)',
      colorIcon: 'var(--gray-lighter)',
      colorIconHover: 'var(--primary)',
      activeBg: 'rgba(110, 17, 217, 0.1)',
      cellActiveWithRangeBg: 'rgba(110, 17, 217, 0.2)',
      controlItemBgActive: 'red',
      colorBgElevated: 'var(--gray-800)',
      colorTextHeading: 'var(--gray-lightest)',
      colorSplit: 'var(--gray-600)',
      colorTextDisabled: 'var(--gray-500)',
    },
  },
};

const directionOrderOption = [
  {
    value: 'DESC',
    label: 'Descend',
  },
  {
    value: 'ASC',
    label: 'Ascend',
  },
];

const actionFilterOption = [
  {
    value: 'ON',
    label: (
      <Tag className="ctTable-tag" color="green">
        ON
      </Tag>
    ),
  },
  {
    value: 'OFF',
    label: <Tag color="red">OFF</Tag>,
  },
];

const searchOperatorOptions = [
  {
    label: (
      <>
        <span style={{ paddingRight: 10 }}>Equal to</span>
        <Tag color="green">{<FaEquals />}</Tag>
      </>
    ),
    value: 'equal',
  },
  {
    label: (
      <>
        <span style={{ paddingRight: 10 }}>Greater or equal</span>
        <Tag color="green">{<FaGreaterThanEqual />}</Tag>
      </>
    ),
    value: 'greater',
  },
  {
    label: (
      <>
        <span style={{ paddingRight: 10 }}>Less or equal</span>
        <Tag color="green">{<FaLessThanEqual />}</Tag>
      </>
    ),
    value: 'less',
  },
  {
    label: 'In range',
    value: 'inRange',
  },
];

function CustomTable({
  data,
  columns,
  title,
  paginationData,
  handlePageChange,
  loading,
  filterData,
  searchData,
  handleSearchChange,
  ...otherProps
}) {
  const [messageApi, contextHolder] = message.useMessage();
  const { dark } = useContext(ThemeContext);
  // const [paginationPageSize, setPaginationPageSize] = useState(10);
  const [orderFilter, setOrderFilter] = useState({});
  const [dateFilter, setDateFilter] = useState({});
  const [selectedData, setSelectedData] = useState(data);
  const [checkedColumnList, setCheckedColumnList] = useState(() => {
    return columns.map((item) => item.key);
  });
  // Contain title of header and data of body
  const [tableData, setTableData] = useState({
    header: columns,
    body: data,
  });
  // Setup orderField options
  const optionOrderBy = useMemo(() => {
    const resultOrderFiltered = columns.filter(({ dataIndex }) => {
      const field = dataIndex.toLowerCase();
      if (!field.startsWith('id') && !field.endsWith('id') && field !== 'updatedat' && field !== 'action') return true;
      return false;
    });
    return resultOrderFiltered.map((item) => ({
      label: item?.dataIndex[0]?.toUpperCase() + item?.dataIndex?.slice(1),
      value: item?.dataIndex,
    }));
  }, [columns]);

  const checkColumnOptions = useMemo(() => {
    return columns.map((column) => ({
      label: column.title,
      value: column.key,
    }));
  }, [columns]);

  const filteredColumns = useMemo(() => {
    return columns.map((item) => ({
      ...item,
      hidden: !checkedColumnList.includes(item.key),
    }));
  }, [checkedColumnList, columns]);

  const downloadItems = [
    {
      key: 'csv',
      label: (
        <CSVLink
          headers={tableData.header}
          data={tableData.body}
          filename={`${title} - created at ${time.getCurrentDateTimeInVietnam()}`}
          target="_blank"
        >
          Export to .CSV
        </CSVLink>
      ),
      icon: <FaFileCsv className={'download-icon'} />,
    },
    {
      key: 'xlsx',
      label: 'Export to .XLSX',
      icon: <RiFileExcel2Fill className={'download-icon'} />,
      onClick: handleExportData,
    },
  ];

  // Checkbox selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRows);
      otherProps?.handleDeleteChange(selectedRows.map((selectedItem) => selectedItem?.id));
      setSelectedData(selectedRows.length > 0 ? selectedRows : data);
    },
    // getCheckboxProps: (record) => ({
    //   name: record.id,
    // }),
  };

  const handleSearchBtnClick = () => {
    let originalFilterData = { ...filterData };
    // Oder filter
    let orderCOndition = {};
    const { orderBy, direction } = orderFilter;
    if (!orderBy && !direction) {
    } else {
      if (!orderBy || !direction) {
        messageApi.warning(`${!orderFilter.orderBy ? 'ORDER BY' : 'ORDER DIRECTION'} is invalid`);
        const { orderBy, direction, ...otherFilters } = originalFilterData;
        originalFilterData = { ...otherFilters };
      } else {
        orderCOndition = { ...originalFilterData, ...orderFilter };
      }
    }
    // Date filter
    // console.log('dateFilter', dateFilter);
    // console.log('filterData', filterData);
    let dateCondition = {};
    const { startDate, endDate } = dateFilter;
    if (startDate) {
      dateCondition.startDate = startDate;
    } else {
      const { startDate, ...otherFilters } = originalFilterData;
      originalFilterData = { ...otherFilters };
    }
    if (endDate) {
      dateCondition.endDate = endDate;
    } else {
      const { endDate, ...otherFilters } = originalFilterData;
      originalFilterData = { ...otherFilters };
    }

    // Search condition
    let searchCondition = {};
    const { searchField, searchOperator, searchValue } = searchData;
    if (searchField && searchOperator && searchValue) {
      const valueArray = searchData.searchValue?.split(',');
      searchCondition = { searchField, searchOperator };
      if (valueArray.length === 1) {
        searchCondition.searchValue = valueArray[0];
      } else if (valueArray[0] < valueArray[1]) {
        searchCondition.searchValue = searchValue;
      } else {
        messageApi.warning('FROM VALUE cannot greater than TO VALUE.');
      }
    } else {
      delete originalFilterData.searchOperator;
      delete originalFilterData.searchValue;
      delete originalFilterData.searchField;
      messageApi.info('Searching VALUE is not applied.');
    }

    handlePageChange({
      ...originalFilterData,
      ...orderCOndition,
      ...dateCondition,
      ...searchCondition,
      page: 1,
      pageSize: 10,
    });
  };

  function handleExportData({ key }) {
    const { header, body } = tableData;
    switch (key) {
      case 'xlsx':
        downloadExcel({
          fileName: `${title} - created at ${time.getCurrentDateTimeInVietnam()}`,
          sheet: `${title} - created at ${time.getCurrentDateTimeInVietnam()}`,
          tablePayload: {
            header,
            body,
          },
        });
        break;
      default:
        break;
    }
  }

  const renderTableHeader = () => {
    return (
      <Flex align="center" justify="space-between" className={'ctTable-header'}>
        <p className={'ctTable-header-title'}>{title}</p>

        <Flex align="center" gap={20}>
          <Flex vertical gap={10} align="flex-end">
            <Space>
              <Flex align="center" gap={10}>
                <p className="csTable-filter-title">Date filter:</p>
                <Space>
                  <DatePicker
                    showTime
                    onChange={(date, dateString) => setDateFilter((prev) => ({ ...prev, startDate: dateString }))}
                  />
                  <p className="csTable-filter-title">
                    <FaArrowRight style={{ display: 'flex' }} />
                  </p>
                  <DatePicker
                    showTime
                    onChange={(date, dateString) => setDateFilter((prev) => ({ ...prev, endDate: dateString }))}
                  />
                </Space>
              </Flex>
              <Space>
                <p className="csTable-filter-title">Order:</p>
                <Space.Compact>
                  <Select
                    allowClear
                    placeholder="Select a field"
                    style={{
                      width: 160,
                    }}
                    options={optionOrderBy}
                    onChange={(value) => setOrderFilter((prev) => ({ ...prev, orderBy: value }))}
                  />
                  <Select
                    allowClear
                    placeholder="Direction"
                    style={{
                      width: 120,
                    }}
                    options={directionOrderOption}
                    onChange={(value) => setOrderFilter((prev) => ({ ...prev, direction: value }))}
                  />
                </Space.Compact>
              </Space>
            </Space>
            {/* Search Space */}
            <Space>
              {window.location.pathname === '/history/sensors' && (
                <Space>
                  <p className="csTable-filter-title">Search with value:</p>
                  <>
                    <Space.Compact>
                      <Tooltip title="Field to search" placement="bottomLeft">
                        <>
                          <Select
                            allowClear
                            placeholder="Select a field"
                            style={{
                              width: 160,
                            }}
                            options={optionOrderBy.filter((item) => item?.value !== 'createdAt')}
                            onChange={(value) => handleSearchChange({ ...searchData, searchField: value })}
                          />
                        </>
                      </Tooltip>
                      <Tooltip title="Compare operator" placement="bottomLeft">
                        <>
                          <Select
                            allowClear
                            placeholder="Select a operator"
                            style={{
                              width: 200,
                            }}
                            options={searchOperatorOptions}
                            onChange={(value) => handleSearchChange({ ...searchData, searchOperator: value })}
                          />
                        </>
                      </Tooltip>
                      <Tooltip
                        title={searchData.searchOperator === 'inRange' ? 'From Value' : 'Value to search'}
                        placement="bottomLeft"
                      >
                        <>
                          <InputNumber
                            style={{ width: 120 }}
                            placeholder={searchData.searchOperator === 'inRange' ? 'From Value' : '00.00'}
                            onChange={(value) => handleSearchChange({ ...searchData, searchValue: value?.toString() })}
                            type="number"
                          />
                        </>
                      </Tooltip>
                      {searchData.searchOperator === 'inRange' && (
                        <Tooltip
                          title={searchData.searchOperator === 'inRange' ? 'To Value' : 'Value to search'}
                          placement="bottomLeft"
                        >
                          <>
                            <InputNumber
                              disabled={!searchData.searchValue}
                              style={{ width: 120 }}
                              placeholder="To Value"
                              onChange={(value) => {
                                const searchValue = searchData.searchValue?.split(',')[0];
                                handleSearchChange({
                                  ...searchData,
                                  searchValue: `${searchValue},${value ? value : ''}`,
                                });
                              }}
                            />
                          </>
                        </Tooltip>
                      )}
                    </Space.Compact>
                  </>
                </Space>
              )}
              {window.location.pathname === '/history/actions' && (
                <Space>
                  <p className="csTable-filter-title">Action:</p>
                  <Tooltip title="Select and show results immediately">
                    <>
                      <Select
                        allowClear
                        placeholder="Select an action"
                        style={{
                          width: 150,
                        }}
                        options={actionFilterOption}
                        onChange={(value) => otherProps?.handleChangeActionFilter(value)}
                      />
                    </>
                  </Tooltip>
                </Space>
              )}
            </Space>
          </Flex>
          <Tooltip title="Apply and Search">
            <Button
              className="ctTable-search-btn"
              onClick={handleSearchBtnClick}
              icon={<IoSearch className="ctTable-search-icon" />}
            />
          </Tooltip>
        </Flex>
      </Flex>
    );
  };

  const renderTableFooter = () => {
    return (
      <div className={'ctTale-footer'}>
        <Checkbox.Group
          value={checkedColumnList}
          options={checkColumnOptions}
          onChange={(value) => {
            console.log('Log in renderTableFooter', value);
            setCheckedColumnList(value);
          }}
        />
        <Space>
          <Dropdown.Button
            type="primary"
            placement="topRight"
            menu={{ items: downloadItems }}
            overlayClassName={`ctTable-dropdown-menu ${dark && 'dark'}`}
          >
            Export Data
          </Dropdown.Button>
        </Space>
      </div>
    );
  };

  useEffect(() => {
    const header = ['STT'].concat(
      filteredColumns
        .map((column) => column.title)
        .filter((item) => {
          const lowerCaseStr = item.toLowerCase().split(' ').join('');
          return (
            lowerCaseStr !== 'id' && checkedColumnList.some((checkedItem) => checkedItem.toLowerCase() === lowerCaseStr)
          );
        }),
    );
    const body = selectedData.map(({ id, ...fields }) => {
      let row = [id];
      Object.entries(fields).forEach(([key, value]) => {
        if (checkedColumnList.includes(key)) {
          if (moment.isMoment(value)) row.push(time.formatToCustomFormat(value));
          else row.push(value);
        }
      });
      return row;
    });
    setTableData({ header, body });
  }, [filteredColumns, selectedData, checkedColumnList]);

  return (
    <>
      {contextHolder}
      <div className={classNames('ctTable-wrapper', { dark })}>
        <ConfigProvider
          // theme={{
          //   token: {
          //     colorPrimary: '#9254de',
          //   },
          //   components: {
          //     Table: {
          //       rowHoverBg: 'rgba(110, 17, 217, 0.1)',
          //       rowSelectedBg: 'rgba(110, 17, 217, 0.2)',
          //       rowSelectedHoverBg: 'rgba(110, 17, 217, 0.3)',
          //       headerBg: '#232227',
          //       bodySortBg: 'rgba(110, 17, 217, 0.1)',
          //       headerSortHoverBg: 'rgba(110, 17, 217, 0.1)',
          //       headerSortActiveBg: 'rgba(110, 17, 217, 0.2)',
          //       colorBgContainer: '#232227',
          //       borderColor: 'rgba(var(--secondary-rgb), 0.6)',
          //       colorText: 'var(--gray-400)',
          //       colorTextHeading: 'var(--gray-300)',
          //       headerFilterHoverBg: 'var(--gray)',
          //       headerSplitColor: 'var(--gray)',
          //       colorIcon: '#adb5bd',
          //       filterDropdownBg: 'var(--gray)',
          //       filterDropdownMenuBg: 'var(--gray)',
          //       footerBg: 'var(--bg-box-dark)',
          //     },
          //   },
          // }}
          theme={dark ? darkTheme : lightTheme}
        >
          <Table
            loading={loading}
            style={{
              width: '100%',
            }}
            className={classNames('ctTable-table')}
            columns={filteredColumns}
            dataSource={data}
            bordered
            size="middle"
            title={renderTableHeader}
            footer={renderTableFooter}
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys: loading === true ? [] : undefined,
              ...rowSelection,
            }}
            pagination={{
              position: ['bottomCenter'],
              current: paginationData.currentPage ? paginationData.currentPage : 1,
              pageSize: paginationData.pageSize,
              total: paginationData.total,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ y: 480 }}
            onChange={(pagination, filters, sorter, extra) => {
              // console.group();
              // console.log('pagination', pagination);
              // console.groupEnd();

              handlePageChange({
                ...filterData,
                page: pagination.current,
                pageSize: pagination.pageSize,
              });
            }}
          />
          <>
            <FloatButton.Group
              trigger="hover"
              type="primary"
              style={{
                right: 24,
              }}
              icon={<RiToolsFill />}
            >
              <FloatButton
                className="test"
                icon={<MdDeleteForever className="ctTable-float-delete-btn" />}
                tooltip={'Delete'}
                onClick={otherProps?.handleDeleteDataSensor}
              />
              <FloatButton
                icon={<LuRefreshCw />}
                tooltip="Refresh"
                onClick={() =>
                  handlePageChange({ orderBy: 'createdAt', direction: 'DESC', refresh: Math.random() * 100 })
                }
              />
            </FloatButton.Group>
          </>
        </ConfigProvider>
      </div>
    </>
  );
}

export default CustomTable;
