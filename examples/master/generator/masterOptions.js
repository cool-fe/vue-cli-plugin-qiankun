let options = { masterHistoryType: 'browser', base: '/' };
export const getMasterOptions = () => options;
export const setMasterOptions = (newOpts) => (options = { ...options, ...newOpts });

export function getMasterRuntime() {
  const config = {
    master: {
      apps: [
        {
          name: 'app1',
          entry: 'http://localhost:8081/app1',
          props: {
            test1: 'app1-test1'
          }
        },
        {
          name: 'app2',
          entry: 'http://localhost:8002/app2'
        },
        {
          name: 'app3',
          entry: 'http://localhost:8003/app3'
        }
      ]
    }
  };
  const { master } = config;
  return master || config;
}
