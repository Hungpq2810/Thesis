import { useQuery } from "react-query"
import { organizationService } from "../../../shared/services/organization.service"
import React from "react"
import DashboardLayout from "../../../shared/layouts/DashboardLayout"

const YourOrganization = () => {
    const {data: dataMyOrganization} = useQuery(['myOrganization'], () => organizationService.getMyOrganization())  

    return (
        <React.Fragment>
            <h1 className='flex flex-col justify-center items-center gap-10 mb-24 text-6xl leading-8 text-bold text-[#0F147F]'>
                Tổ chức của bạn
            </h1>
            <h3>
                Tên tổ chức: {dataMyOrganization?.data.data.organization.name}
            </h3>
            <h3>
                Địa chỉ: {dataMyOrganization?.data.data.organization.location}
            </h3>
            <h3>
                Mô tả: 
            </h3>
            <h3 style={{whiteSpace: 'pre-line'}} ></h3>
            {dataMyOrganization?.data.data.organization.description}
        </React.Fragment>
    )
}

YourOrganization.getLayout = (children: React.ReactNode) => (
    <DashboardLayout>{children}</DashboardLayout>
)

export default YourOrganization