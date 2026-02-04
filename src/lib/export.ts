import { TestCase } from "./engine";

export function exportToCSV(data: TestCase[], filename: string = "test_cases.csv") {
    if (!data || data.length === 0) return;

    const headers = ["ID", "Title", "Platform", "Priority", "Type", "Preconditions", "Steps", "Expected Result", "Automated"];

    const csvContent = [
        headers.join(","), // Header Row
        ...data.map(tc => {
            const row = [
                tc.id,
                `"${tc.title.replace(/"/g, '""')}"`, // Escape quotes
                tc.platform,
                tc.priority,
                tc.type,
                `"${tc.preconditions.replace(/"/g, '""')}"`,
                `"${tc.steps.join("; ").replace(/"/g, '""')}"`,
                `"${tc.expectedResult.replace(/"/g, '""')}"`,
                tc.auto ? "Yes" : "No"
            ];
            return row.join(",");
        })
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
