import { useContext, useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { ConfigProvider, Table, Checkbox, Dropdown, Space } from 'antd';
import { downloadExcel } from 'react-export-table-to-excel';
import { CSVLink } from 'react-csv';

import * as time from '@/utils/time';
import { ThemeContext } from '@/contexts/ThemeContext';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { FaFileCsv } from 'react-icons/fa';
import './CustomTable.scss';
import moment from 'moment';

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
      colorBorder: 'var(--primary) !important',
      colorText: 'var(--gray-lighter)',
      controlItemBgActive: 'var(--gray)',
      selectorBg: 'var(--gray)',
      optionSelectedBg: 'var(--gray)',
      controlItemBgHover: 'var(--gray-500)',
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

function CustomTable({ data, columns, title }) {
  const { dark } = useContext(ThemeContext);
  const [paginationPageSize, setPaginationPageSize] = useState(10);
  const [selectedData, setSelectedData] = useState(data);
  const [checkedColumnList, setCheckedColumnList] = useState(() => {
    return columns.map((item) => item.key);
  });
  // Contain title of header and data of body
  const [tableData, setTableData] = useState({
    header: columns,
    body: data,
  });

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
      setSelectedData(selectedRows.length > 0 ? selectedRows : data);
    },
    getCheckboxProps: (record) => ({
      name: record.id,
    }),
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

  const renderTableFooter = () => {
    return (
      <div className={'ctTale-footer'}>
        <Checkbox.Group
          value={checkedColumnList}
          options={checkColumnOptions}
          onChange={(value) => {
            console.log(value);
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
          style={{
            width: '100%',
          }}
          className={classNames('ctTable-table')}
          columns={filteredColumns}
          dataSource={data}
          bordered
          size="middle"
          title={() => <p className={classNames('ctTable-header')}>{title}</p>}
          footer={renderTableFooter}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          pagination={{
            position: ['bottomCenter'],
            pageSize: paginationPageSize,
            total: data.length,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
          scroll={{
            y: 500,
          }}
          onChange={(pagination, filters, sorter, extra) => {
            // console.group();
            // console.log('pagination', pagination);
            // console.log('filters', filters);
            // console.log('sorter', sorter);
            // console.log('extra', extra);
            // console.groupEnd();
            setPaginationPageSize(pagination.pageSize);
          }}
        />
      </ConfigProvider>
    </div>
  );
}

export default CustomTable;
