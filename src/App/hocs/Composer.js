export default (props = {}) => {
  const { contexts = [], children } = props;

  return (
    <>
      {contexts.reduceRight((accu, context = {}) => {
        const {
          contextProvider: ContextProvider = null,
          contextValue = null,
        } = context;
        if (!ContextProvider || !contextValue) {
          return accu;
        }

        return <ContextProvider value={contextValue}>{accu}</ContextProvider>;
      }, children)}
    </>
  );
};
