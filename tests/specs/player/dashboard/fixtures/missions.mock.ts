





export function createMission(overrides = {}) {
  return {
    id: "d3e791ce-7859-4707-ad20-f7d727b44005",
    createdAt: "2025-10-12T00:38:58.067Z",
    updatedAt: "2026-02-17T12:15:20.000Z",
    user_id: "3d423588-93f9-4c36-b6f4-d4abe8e19c95",
    workflow_id: "68e183c473afb8afc75adfdb",
    step_id: "step_1759612385729_vmeoq069n",
    title: "This: is a test",
    start_date: "2025-10-06T04:00:00.000Z",
    end_date: "2025-10-27T10:30:00.000Z",
    url: null,
    description: "Study the classic traps that kill learning and the executive tactics for modeling and institutionalizing growth.",
    status: "COMPLETED",
    projectName: "Test Project",
    xp: 0,
    projectID: "1a5ab807-fe17-437f-b294-2be09898e4de",
    order: 301,
    ...overrides  // caller decides what changes
  }
}

export const mockMission = createMission();
export const missionComplete = createMission({ status: "COMPLETED", title: "mission completed", xp: 43 });
export const missionNotStarted = createMission({ status: "NOT_STARTED", title: "mission not started" });
export const missionInProgress = createMission({ status: "IN_PROGRESS", title: "mission In progress" });
export const missionFailed = createMission({ status: "FAILED", title: "mission failed" });
export const missionExpiredEligible = createMission({ status: "EXPIRED_ELIGIBLE", title: "mission expired eligible" });
export const missionExpired = createMission({ status: "EXPIRED", title: "mission expired" });
export const missionFactory = Array.from({ length: 12 }, (_, i) =>
  createMission({ id: `mission-${i}`, title: `Mission ${i}` })
)
