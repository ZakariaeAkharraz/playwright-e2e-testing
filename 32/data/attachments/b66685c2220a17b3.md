# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: specs/player/workflow/project-workflow-phase.spec.ts >> project phases functionality >> progress workflow is displayed
- Location: tests/specs/player/workflow/project-workflow-phase.spec.ts:22:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('workflow-progress')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByTestId('workflow-progress')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - button "GamiTool" [ref=e5] [cursor=pointer]:
          - img "GamiTool" [ref=e6]
        - button [ref=e7] [cursor=pointer]:
          - img [ref=e8]
      - generic [ref=e10]:
        - navigation [ref=e11]:
          - list [ref=e12]:
            - listitem [ref=e13]:
              - link "Favoris" [ref=e14] [cursor=pointer]:
                - /url: /fr/projects/favorite
                - img [ref=e15]
                - text: Favoris
        - navigation [ref=e17]:
          - list [ref=e18]:
            - listitem [ref=e19]:
              - link "Tableau de bord" [ref=e20] [cursor=pointer]:
                - /url: /fr/dashboard
                - img [ref=e21]
                - text: Tableau de bord
            - listitem [ref=e26]:
              - generic [ref=e28]:
                - button "Mon Arène" [active] [ref=e29] [cursor=pointer]:
                  - text: Mon Arène
                  - img [ref=e30]
                - region [ref=e32]:
                  - generic [ref=e34]:
                    - link "qa arena" [ref=e35] [cursor=pointer]:
                      - /url: /fr/arenas/d8d8ca45-60b2-48e9-9a82-e06b0825ad5a?arenaName=qa arena
                    - link "Arena 12" [ref=e36] [cursor=pointer]:
                      - /url: /fr/arenas/b99d2d2d-7ad7-47cc-aa27-67e924f4fc87?arenaName=Arena 12
                    - link "arena ce" [ref=e37] [cursor=pointer]:
                      - /url: /fr/arenas/3e3e3265-c428-41fe-a12d-aaca84da4edb?arenaName=arena ce
                    - link "Demo Arena" [ref=e38] [cursor=pointer]:
                      - /url: /fr/arenas/19cb7e11-45a1-4a22-ad1e-ed46bc4453a7?arenaName=Demo Arena
      - generic [ref=e39]:
        - navigation [ref=e40]:
          - list [ref=e41]:
            - listitem [ref=e42]:
              - link "Paramètres" [ref=e43] [cursor=pointer]:
                - /url: /fr/settings
                - img [ref=e44]
                - text: Paramètres
        - button "Déconnexion" [ref=e47] [cursor=pointer]:
          - img [ref=e48]
          - text: Déconnexion
        - generic [ref=e52]:
          - img "Attijari bank" [ref=e54]
          - generic [ref=e55]:
            - paragraph [ref=e56]: Attijari bank
            - paragraph [ref=e57]: Organization
    - generic [ref=e58]:
      - banner [ref=e59]:
        - heading "qa arena" [level=1] [ref=e60]
        - generic [ref=e61]:
          - button "Start tutorial" [ref=e62] [cursor=pointer]: Tutorial
          - button "Show achievements" [ref=e64] [cursor=pointer]:
            - img "Achievements" [ref=e65]
          - button "Afficher le tiroir d'aide" [ref=e68] [cursor=pointer]:
            - img "Aide" [ref=e69]
          - button "Afficher le tiroir de tâches" [ref=e71] [cursor=pointer]:
            - img "Tâches" [ref=e72]
          - button "Notifications 1" [ref=e74] [cursor=pointer]:
            - img "Notifications" [ref=e75]
            - generic [ref=e76]: "1"
          - button "Change language" [ref=e78] [cursor=pointer]:
            - img [ref=e79]
          - generic [ref=e83] [cursor=pointer]: QT
      - main [ref=e84]:
        - generic [ref=e85]:
          - generic [ref=e87]:
            - heading "Bienvenue Qa Test dans votre Arène 👋" [level=2] [ref=e89]
            - img "Bienvenue Arène" [ref=e94]
          - generic [ref=e95]:
            - combobox [ref=e96]:
              - generic: Toutes les quêtes
              - img
            - combobox [ref=e97]:
              - generic: Date de création
              - img
            - combobox [ref=e98]:
              - generic: Décroissant
              - img
            - generic [ref=e99]:
              - img
              - textbox "Rechercher une quête..." [ref=e100]
          - generic [ref=e102] [cursor=pointer]:
            - generic [ref=e103]:
              - img [ref=e104]
              - generic [ref=e109]: Active
              - button "Projet ajouté aux favoris avec succès" [ref=e110]:
                - img "Projet ajouté aux favoris avec succès" [ref=e111]
            - generic [ref=e112]:
              - generic [ref=e114]:
                - heading "qaa Project" [level=3] [ref=e115]
                - paragraph [ref=e116]: desc
              - generic [ref=e117]:
                - generic [ref=e118]: onboarding
                - generic [ref=e119]: Créé il y a un mois
              - generic [ref=e120]:
                - generic [ref=e121]:
                  - generic [ref=e123]: AA
                  - generic [ref=e124]:
                    - paragraph [ref=e125]: Alice Admin
                    - paragraph [ref=e126]: Mentor
                - generic [ref=e127]:
                  - progressbar [ref=e128]
                  - paragraph [ref=e130]: 9% terminé
  - region "Notifications alt+T"
  - alert [ref=e131]
```

# Test source

```ts
  1  | 
  2  | 
  3  | 
  4  | 
  5  | import test, { expect } from "@playwright/test";
  6  | import { Dashboard } from "../../../pages/dashboard.page";
  7  | import { project } from "../../../helpers/test-project";
  8  | import { Arena } from "../../../pages/arena.page";
  9  | 
  10 | test.describe("project phases functionality", {
  11 |     tag: "@PE-PR-PH",
  12 | }, () => {
  13 | 
  14 |     test.beforeEach(async ({ page }) => {
  15 | 
  16 |         const dashboard = new Dashboard(page);
  17 |         await dashboard.goto();
  18 | 
  19 | 
  20 |     })
  21 | 
  22 |     test("progress workflow is displayed", {
  23 |         tag: "@PE-PR-PH-01",
  24 |     }, async ({ page }) => {
  25 |         const arena = new Arena(page);
  26 |         await arena.goto();
> 27 |         await expect(page.getByTestId("workflow-progress")).toBeVisible();
     |                                                             ^ Error: expect(locator).toBeVisible() failed
  28 |         await expect(page.getByTestId("journey-map")).toBeVisible();
  29 |         await expect(page.locator("div[data-tutorial='active-missions']")).toBeVisible();
  30 | 
  31 |     })
  32 | 
  33 |     test("should view corresponding missions of a phase when clicking on it", async ({ page }) => {
  34 | 
  35 |         const arena = new Arena(page);
  36 |         await arena.goto();
  37 | 
  38 |         await page.locator("div[data-tutorial='project-cards']").first().click();
  39 | 
  40 |         await page.waitForURL(/.*projects.*/)
  41 | 
  42 |         // simple way to assert new missions are loaded, it is enough to assert the one of the old mission disappears
  43 |         // and there is at least one mission visible afrer clicking on the phase
  44 |         const firstMission = await page.locator("div[data-tutorial='active-missions']").locator("div[data-mission-id]").first().getAttribute("data-mission-id");
  45 |         await expect(page.locator(`div[data-mission-id="${firstMission}"]`)).toBeVisible();
  46 |         
  47 |         const phaseRequest = page.waitForRequest("**/steps-progress?phase=" + project[0].phases[0]+"*")
  48 |         await page.getByTestId(project[0].phaseTestIds[0]).click();
  49 |         await phaseRequest;
  50 | 
  51 | 
  52 |         await expect(page.locator("div[data-tutorial='active-missions']").locator("div[data-mission-id]").first()).toBeVisible();
  53 |         await expect(page.locator(`div[data-mission-id="${firstMission}"]`)).not.toBeVisible();
  54 |     
  55 | 
  56 | 
  57 | 
  58 | 
  59 |     })
  60 | 
  61 | })
```