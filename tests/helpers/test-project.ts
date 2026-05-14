export const project = [{


    phases: ["WEEK_1",
        "WEEK_2",
        "WEEK_3",
        "WEEK_4"],
    phaseTestIds: ["workflow-phase-1",
        "workflow-phase-2",
        "workflow-phase-3",
        "workflow-phase-4"]
},]

export type Arena = {
    name: string,
    project: {
        name: string,
        workflowId: string,
        path: string,
        phase: [
            {
                name: string,
                steps: {
                    DOCUMENTS_TO_READ: { name: string, id: string },
                    UPLOAD_DOCUMENTS: string,
                    TASKS: string,
                    MEDIA: string,
                    GAME: { name: string, id: string }
                }
            }
            ,]

    }
}
export const arena: Arena = {
    name: "Qa Arena",
    project: {
        name: "qaa Project",
        workflowId: "69df9296c0aa97ff39362bb9",
        path: "/projects/69df9296c0aa97ff39362bb9",
        phase: [
            {
                name: "WELCOME",
                steps: {
                    DOCUMENTS_TO_READ: { name: "Doc to read", id: "step_1774967072245_1vnthkx4" },
                    UPLOAD_DOCUMENTS: "Upload doc",
                    TASKS: "Tasks welcome",
                    MEDIA: "media welcome",
                    GAME: { name: "step gaming", id: "step_1776257573164_njovs69c" }
                }
            }
        ]

    }

    ,

}