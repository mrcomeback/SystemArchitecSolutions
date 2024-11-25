var Employee = /** @class */ (function () {
    function Employee(position, salary) {
        this.position = position;
        this.salary = salary;
    }
    Employee.prototype.getReport = function (visitor) {
        return visitor.reportEmployeeSalary(this);
    };
    return Employee;
}());
var Department = /** @class */ (function () {
    function Department(name, employees) {
        this.name = name;
        this.employees = employees;
    }
    Department.prototype.getReport = function (visitor) {
        return visitor.reportDepartmentSalaries(this);
    };
    Department.prototype.getEmployees = function () {
        return this.employees;
    };
    return Department;
}());
var Company = /** @class */ (function () {
    function Company(departments) {
        this.departments = departments;
    }
    Company.prototype.getReport = function (visitor) {
        return visitor.reportCompanySalaries(this);
    };
    Company.prototype.getDepartments = function () {
        return this.departments;
    };
    return Company;
}());
// usage
var SalaryReportManager = /** @class */ (function () {
    function SalaryReportManager() {
    }
    SalaryReportManager.prototype.reportCompanySalaries = function (company) {
        var _this = this;
        var report = "Company Report";
        company.getDepartments().forEach(function (department) { return report += department.getReport(_this); });
        return report;
    };
    SalaryReportManager.prototype.reportDepartmentSalaries = function (department) {
        var _this = this;
        var report = "Department Report";
        department.getEmployees().forEach(function (employee) { return report += employee.getReport(_this); });
        return report;
    };
    SalaryReportManager.prototype.reportEmployeeSalary = function (employee) {
        return "".concat(employee.position, ": ya ne z takoi sim'\u0457 ").concat(employee.salary, "grn");
    };
    return SalaryReportManager;
}());
var SalesManagerEmployee = new Employee('Sales Manager', 123);
var DirectorEmployee = new Employee('Director', 88888);
var RobotyagaEmployee = new Employee('Robotyaga', 1);
var departmentPershui = new Department('Pershui', [SalesManagerEmployee, DirectorEmployee]);
var departmentDrugui = new Department('Drugui', [RobotyagaEmployee]);
var company = new Company([departmentPershui, departmentDrugui]);
// Generate Salary Report
var reportManager = new SalaryReportManager();
console.log(company.getReport(reportManager));
console.log("==================================");
console.log(SalesManagerEmployee.getReport(reportManager));
console.log("===================================");
console.log(departmentPershui.getReport(reportManager));
