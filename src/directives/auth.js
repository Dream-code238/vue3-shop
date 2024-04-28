import store from '@/store';

const hasRoleAuth = (value, el) => {
  if (!Array.isArray(value)) {

    throw new Error("需要配置权限，例如: v-auth=['getStatistics1,GET']");

  }

  const hasAuth = value.some(v => store.state.manager.ruleNames.includes(v));

  if (el && !hasAuth) {

    el.parentNode && el.parentNode.removeChild(el);

  }

  return hasAuth;

};



export default {
  install: app => {

    app.directive('auth', {

      mounted(el, binding) {

        hasRoleAuth(binding.value, el);
        
      }

    });

  }
}