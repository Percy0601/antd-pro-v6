import moment from "moment/moment";

export const setFieldsConverter = (data: BasicListApi.PageData) => {
    if(data?.layout?.tabs && data?.dataSource) {
        const result = {};
        data.layout.tabs.forEach((tab) => {
            tab.data.forEach((field) => {
                switch (field.type) {
                    case 'datetime':
                        result[field.key] = moment(data.dataSource[field.key]);
                        break;
                    default:
                        result[field.key] = data.dataSource[field.key];
                        break;
                }
            });
        });
        return result;
    }
    return {};
};

export const submitFieldAdaptor = (formValues: any) => {
    const result = formValues;
    Object.keys(formValues).forEach((key: string) => {
        // key = key;
        // value = formValues[key];
        result[key] = formValues[key];
        if(moment.isMoment(formValues[key])) {
            result[key] = moment(formValues[key]).format();
        }

    });
    return result;
};