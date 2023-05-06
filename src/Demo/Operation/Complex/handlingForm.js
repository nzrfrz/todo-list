import dayjs from "dayjs";

export const onFinishForm = (channelData, mutate, values, state) => {
    const personInfo = {
        personalName: values.personalName,
        position: values.position,
        dateOfBirth: dayjs(values.dateOfBirth).format('YYYY-MM-DD'),
        gender: values.gender,
        personalAddress: values.personalAddress,
        personalProvince: values.personalProvince,
        personalRegency: values.personalRegency,
        personalSubDistrict: values.personalSubDistrict,
        personalVillage: values.personalVillage,
        personalEmail: values.personalEmail,
        personalNumber: values.personalNumber.areaCode.toString().replace('+', '') + "-" +  values.personalNumber.phoneNumber.toString(),
        userName: values.userName,
        password: values.password,
    }

    const corporateInfo = {
        corporateName: values.corporateName,
        corporateSector: values.corporateSector,
        businessScale: values.businessScale,
        officeEmail: values.officeEmail,
        officeNumber: values.officeNumber.areaCode.toString().replace('+', '') + "-" +  values.officeNumber.phoneNumber.toString(),
        officeAddress: values.officeAddress,
        province: values.province,
        regency: values.regency,
        subDistrict: values.subDistrict,
        village: values.village,
        postalCode: values.postalCode.toString(),
    }

    const contractInfo = {
        contractActiveStartDate: values['contractActiveDate'][0].format('YYYY-MM-DD'),
        contractActiveEndDate: values['contractActiveDate'][1].format('YYYY-MM-DD'),
        contractValue: values.contractValue.toString(),
        channelDeals: values.channelDeals.map((item) => {
            return {
                platform: channelData.filter((data) => item.platform === data.name).map((data) => data.value).toString(),
                price: item.price.toString(),
                effectiveStartDate: item.specificDate[0].format('YYYY-MM-DD'),
                effectiveEndDate: item.specificDate[1].format('YYYY-MM-DD'),
            }
        }),
    };

    const finalPayload = {
        ...personInfo,
        ...corporateInfo,
        ...contractInfo
    };

    console.log(finalPayload);
    mutate.mutateAsync({payload: finalPayload, dataID: state?.rowData?.id});
};

export const setFormFieldValue = (channelData, formProps, state) => {
    formProps.setFieldsValue({
        personalName: state?.rowData?.personalName,
        position: state?.rowData?.position,
        dateOfBirth: dayjs(state?.rowData?.dateOfBirth),
        gender: state?.rowData?.gender,
        personalEmail: state?.rowData?.personalEmail,
        personalAddress: state?.rowData?.personalAddress,
        personalProvince: state?.rowData?.personalProvince,
        personalRegency: state?.rowData?.personalRegency,
        personalSubDistrict: state?.rowData?.personalSubDistrict,
        personalVillage: state?.rowData?.personalVillage,
        personalNumber: {
            areaCode: `+${state?.rowData?.personalNumber?.replace(" ", "").split("-")[0]}`,
            phoneNumber: Number(state?.rowData?.personalNumber?.replace(" ", "").split("-")[1])
        },
        corporateName: state?.rowData?.corporateName,
        corporateSector: state?.rowData?.corporateSector,
        businessScale: state?.rowData?.businessScale,
        officeEmail: state?.rowData?.officeEmail,
        officeNumber: {
            areaCode: Number(state?.rowData?.officeNumber?.replace(" ", "").split("-")[0]),
            phoneNumber: Number(state?.rowData?.officeNumber?.replace(" ", "").split("-")[1]),
        },
        officeAddress: state?.rowData?.officeAddress,
        province: state?.rowData?.province,
        regency: state?.rowData?.regency,
        subDistrict: state?.rowData?.subDistrict,
        village: state?.rowData?.village,
        postalCode: Number(state?.rowData?.postalCode),
        contractValue: Number(state?.rowData?.contractValue),
        contractActiveDate: [
            dayjs(state?.rowData?.contractActiveStartDate),
            dayjs(state?.rowData?.contractActiveEndDate)
        ],
        channelDeals: state?.rowData?.channelDeals.length === 0 ? [...channelDealsInitialValue] : state?.rowData?.channelDeals.map((data) => {
            return {
                platform: channelData.filter((item) => item.value === data.platform)[0].name,
                price: Number(data.price),
                contractType: data.effectiveStartDate === state?.rowData?.contractActiveStartDate && data.effectiveEndDate === state?.rowData?.contractActiveEndDate ? "general" : "specific",
                specificDate: [
                    dayjs(state?.rowData?.effectiveStartDate),
                    dayjs(state?.rowData?.effectiveEndDate),
                ]
            }
        })
    })
};