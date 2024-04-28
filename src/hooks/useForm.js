import { ref, reactive, onMounted } from 'vue';




const useForm = config => {

  const {
    formData = {},
    rules = {}
  } = config;

  // 表单元素
  const formRef = ref(null);

  // 表单数据
  const formConfig = reactive({});

  // 初始化删选数据
  const initFormConfig = values => {
    if (!Object.keys(values).length) {
      return false;
    }
    // 循环传入的配置选项
    for (const key in values) {
      // 当ES6语法判断传入的key和默认配置选项的key是否一致时，将传入的配置选项赋值给默认配置选项
      formConfig[key] = values[key];
    }
  };

  // 重置表单
  const resetForm = (item = false) => {
    if (formRef.value) formRef.value.clearValidate()
    if (item) {
      for (const key in formConfig) {
        formConfig[key] = item[key]
      }
    }
  }

  onMounted(() => initFormConfig(formData));

  return {
    formRef,
    formConfig,
    rules,
    initFormConfig,
    resetForm
  };
};


export default useForm;






