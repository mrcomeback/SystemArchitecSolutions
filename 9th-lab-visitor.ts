// Visitor Interface
interface Visitor {
    reportCompanySalaries(company: Company): string;
    reportDepartmentSalaries(department: Department): string;
    reportEmployeeSalary(employee: Employee): string;
}

interface CompanyStructure {
    getReport(visitor: Visitor): void;
}

class Employee implements CompanyStructure {
    constructor(public position: string, public salary: number) { }

    getReport(visitor: Visitor): string {
        return visitor.reportEmployeeSalary(this);
    }
}

class Department implements CompanyStructure {
    private employees: Employee[];

    constructor(public name: string, employees: Employee[]) {
        this.employees = employees;
    }

    getReport(visitor: Visitor): string {
        return visitor.reportDepartmentSalaries(this);
    }

    getEmployees(): Employee[] {
        return this.employees;
    }
}

class Company implements CompanyStructure {
    private departments: Department[];

    constructor(departments: Department[]) {
        this.departments = departments;
    }

    getReport(visitor: Visitor): string {
        return visitor.reportCompanySalaries(this);
    }

    getDepartments(): Department[] {
        return this.departments;
    }
}


// usage

class SalaryReportManager implements Visitor {

    reportCompanySalaries(company: Company): string {
        let report = "Company Report";
        company.getDepartments().forEach(department => report += department.getReport(this));
        return report;
    }

    reportDepartmentSalaries(department: Department): string {
        let report = "Department Report"
        department.getEmployees().forEach(employee => report += employee.getReport(this))
        return report;
    }

    reportEmployeeSalary(employee: Employee): string {
        return `${employee.position}: ya ne z takoi sim'ї ${employee.salary}grn`;
    }
}

const SalesManagerEmployee = new Employee('Sales Manager', 123);
const DirectorEmployee = new Employee('Director', 88888);
const RobotyagaEmployee = new Employee('Robotyaga', 1);

const departmentPershui = new Department('Pershui', [SalesManagerEmployee, DirectorEmployee]);
const departmentDrugui = new Department('Drugui', [RobotyagaEmployee]);

const company = new Company([departmentPershui, departmentDrugui]);

// Generate Salary Report
const reportManager = new SalaryReportManager();

console.log(company.getReport(reportManager));
console.log("==================================")
console.log(SalesManagerEmployee.getReport(reportManager));
console.log("===================================")
console.log(departmentPershui.getReport(reportManager));
