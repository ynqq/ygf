import TableRender from '@/render/TableRender'
import { VxeColumn } from 'vxe-table'
import { ElButton, ElMessage, ElMessageBox } from 'element-plus'
export class Type extends TableRender {
    static defineProps = []
    static defineEmits = []

    filters = ref({
        companyName: {
            name: '企业名称',
            element: 'input',
            placeholder: "请输入企业名称",
            value: '',
        },
        tools: {
            name: '',
            element: 'buttonGroup',
            class: 'flex items-center',
            colClass: 'flex-grow-1 justify-end items-end max-w-none',
            params: {
                button: [
                    {
                        name: '重置',
                        class: 'mx-16  rounded-sm',
                        callback: {
                            click: async () => {
                                await this.resetFilters()
                            },
                        },
                    },
                    {
                        name: '搜索',
                        class: ' rounded-sm',
                        params: {
                            type: 'primary',
                        },
                        callback: {
                            click: async () => {
                                await this.reloadPage(1)
                            },
                        },
                    },
                ],
            },
        },
    })

    onEdit = async (row) => {
        // await showUpdateInfo({data: row})
        // await this.reloadPage()
    }
    onDelete = async () => {
        const selections = await this.getCheckboxRecords()
        if(!selections.length){
            ElMessage.warning('请选择需要删除的数据')
            return 
        }
        await ElMessageBox.confirm('是否确认删除', '提示', {type: 'warning'})
        // await deleteStorageTank({ids: selections.map(v => v.id)})
        ElMessage.success('删除成功')
        await this.reloadPage()
    }
    onDeleteRow = async (row) => {
        await ElMessageBox.confirm('是否确认删除', '提示', {type: 'warning'})
        // await deleteStorageTank({ids: [row.id]})
        ElMessage.success('删除成功')
        await this.reloadPage()
    }
    async onLoadData(current: number) {
        return Promise.resolve(
            {
                "records": [{}, {}, {}],
                "total": 0,
                "size": 10,
                "current": 1,
                "pages": 0
            }
        )
    }

    onAdd = async () =>  {
        // await showAddInfo({})
        this.reloadPage()
    }
    columns = () => (
        <>
            <vxe-column type="checkbox" width="60" fixed="left"></vxe-column>
            <VxeColumn
                width={200}
                type="seq"
                title="序号"
            ></VxeColumn>
            <VxeColumn
                width={200}
                field='companyName'
                title="企业名称"
            ></VxeColumn>
           
            <VxeColumn field="action" title="操作" align="center" width="400px" fixed="right">
                {{
                    default: ({row}) => (
                        <>
                            <ElButton
                                class="mr-10"
                                type="primary"
                                onClick={() => this.onEdit(row)}
                            >
                                编辑
                            </ElButton>
                            <ElButton type="danger" onClick={()=>this.onDeleteRow(row)}>删除</ElButton>
                        </>
                    ),
                }}
            </VxeColumn>
        </>
    )

    render = () => {
        return <>{this.elementsEl()}</>
    }
}

export default render.export.bind(Type)
