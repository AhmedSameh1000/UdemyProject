using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UdemyProject.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class init2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_CourseLanguge_langugeId",
                table: "Courses");

            migrationBuilder.AlterColumn<int>(
                name: "langugeId",
                table: "Courses",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_CourseLanguge_langugeId",
                table: "Courses",
                column: "langugeId",
                principalTable: "CourseLanguge",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_CourseLanguge_langugeId",
                table: "Courses");

            migrationBuilder.AlterColumn<int>(
                name: "langugeId",
                table: "Courses",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_CourseLanguge_langugeId",
                table: "Courses",
                column: "langugeId",
                principalTable: "CourseLanguge",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
