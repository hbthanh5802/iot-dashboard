import { useContext, forwardRef, useState } from 'react';
import classNames from 'classnames';
import { ConfigProvider, Table, Checkbox } from 'antd';

import { ThemeContext } from '@/contexts/ThemeContext';
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
      colorBgContainer: 'var(--gray-light)',
      colorBorder: 'var(--gray)',
      colorText: '#000',
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
  },
};

function CustomTable({ data, columns, title }, ref) {
  const { dark } = useContext(ThemeContext);
  const [checkedColumnList, setCheckedColumnList] = useState(function () {
    return columns.map((item) => item.key);
  });

  const options = columns.map(({ key, title }) => ({
    label: title,
    value: key,
  }));

  const filteredColumns = columns.map((item) => ({
    ...item,
    hidden: !checkedColumnList.includes(item.key),
  }));

  const renderCheckColumnList = () => {
    return (
      <Checkbox.Group
        value={checkedColumnList}
        options={options}
        onChange={(value) => {
          setCheckedColumnList(value);
        }}
      />
    );
  };

  return (
    <div className={classNames('ctTable-wrapper', { dark })}>
      <ConfigProvider
        // theme={{
        //   components: {
        //     Dropdown: {
        //       colorPrimaryText: 'red',
        //     },
        //   },
        // }}
        theme={dark ? darkTheme : lightTheme}
      >
        <Table
          ref={ref}
          style={{
            width: '100%',
          }}
          className={classNames('ctTable-table')}
          dataSource={data}
          columns={filteredColumns}
          bordered
          size="middle"
          title={() => <p className={classNames('ctTable-header')}>{title}</p>}
          footer={renderCheckColumnList}
          pagination={{
            position: ['bottomCenter'],
            pageSize: 10,
            total: 100,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
          scroll={{
            y: 200,
          }}
          onChange={(pagination, filters, sorter, extra) => {
            console.log('params', pagination, filters, sorter, extra);
          }}
        />
      </ConfigProvider>
    </div>
  );
}

export default forwardRef(CustomTable);
