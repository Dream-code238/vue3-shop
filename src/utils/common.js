/*
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-20 21:44:09
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-12 10:02:57
 * @FilePath: \shop-admin\src\utils\auth.js
 * @Description: 公共方法
 */
import { useCookies } from '@vueuse/integrations/useCookies';
import nprogress from 'nprogress';

const tokenKey = 'admin-token';

const cookie = useCookies();

// 获取token
export const getToken = () => {
  return cookie.get(tokenKey);
}

// 设置token
export const setToken = token => {
  return cookie.set(tokenKey, token);
}

// 移除token
export const removeToken = () => {
  return cookie.remove(tokenKey);
}


// 成功提示
export const toast = (message, type = 'success', dangerouslyUseHTMLString = true) => {
  ElMessage({
    message,
    type,
    duration: 2000,
    dangerouslyUseHTMLString
  });
};

// 消息确认框
export const messageBox = (message, type = 'warning', title = '提示') => {
  return ElMessageBox.confirm(
    message,
    title,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type,
    }
  )
}

export const messagePrompt = (title = '', value = '', text = '') => {
  return ElMessageBox.prompt(text, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: value
  });
}


// 显示全屏loading
export const showFullLoading = () => {
  nprogress.start();
}

// 隐藏全屏loading
export const hiddenFullLoading = () => {
  nprogress.done();
}


// 位置上移
export const useArrayMoveUp = (data, index) => {
  const temp = data[index - 1];
  data[index - 1] = data[index];
  data[index] = temp;
}

// 位置下移
export const useArrayMoveDown = (data,index) => {
  const temp = data[index + 1];
  data[index + 1] = data[index];
  data[index] = temp;
}


// sku排列算法
export function cartesianProductOf(){
  return Array.prototype.reduce.call(arguments, function (a, b) {
      var ret = [];
      a.forEach(function (a) {
          [...b].forEach(function (b) {
              ret.push(a.concat([b]));
          });
      });
      return ret;
  }, [[]]);
}

export const exportExcel = (XLSX, params) => {
	const keyArray = [];
  let data = [];
	const getLength = function (obj) {
		let count = 0;
		for (const i in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, i)) {
				count++;
			}
		}
		return count;
	};
 
	
  for (const key1 in params.json) {
    if (Object.prototype.hasOwnProperty.call(params.json, key1)) {
      const element = params.json[key1];
      const rowDataArray = [];
      for (const key2 in element) {
        if (Object.prototype.hasOwnProperty.call(element, key2)) {
          const element2 = element[key2];
          rowDataArray.push(element2);
          if (keyArray.length < getLength(element)) {
            keyArray.push(key2);
          }
        }
      }
      data.push(rowDataArray);
    }
  }
  data.splice(0, 0, keyArray, params.titleArr);
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  // 隐藏英文字段表头
  const wsrows = [{ hidden: true }];
  /* 设置worksheet每列的最大宽度 */
  const colWidth = data.map((row) =>
    row.map((val) => {
      /* 先判断是否为null/undefined */
      if (val == null) {
        return {
          wch: 20,
        };
      } else if (val.toString().charCodeAt(0) > 255) {
        /* 再判断是否为中文 */
        return {
          wch: val.toString().length * 2,
        };
      } else {
        return {
          wch: val.toString().length*2,
        };
      }
    })
  );
  /* 以第一行为初始值 */
  const result = colWidth[0];
  for (let i = 1; i < colWidth.length; i++) {
    for (let j = 0; j < colWidth[i].length; j++) {
      if (result[j].wch < colWidth[i][j].wch) {
        result[j].wch = colWidth[i][j].wch;
      }
    }
  }
  ws['!cols'] = result;
  ws['!rows'] = wsrows; // ws - worksheet
  XLSX.utils.book_append_sheet(wb, ws, params.sheetName);
	/* generate file and send to client */
	XLSX.writeFile(wb, `${params.name}.xlsx`);
};