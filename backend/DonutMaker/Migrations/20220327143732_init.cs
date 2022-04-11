using Microsoft.EntityFrameworkCore.Migrations;

namespace DonutMaker.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Donuts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Donuts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ingredients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DonutId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ingredients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ingredients_Donuts_DonutId",
                        column: x => x.DonutId,
                        principalTable: "Donuts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Donuts",
                columns: new[] { "Id", "Image", "Name" },
                values: new object[,]
                {
                    { 1, "https://lh3.googleusercontent.com/AnDqKBwf5I6Lx5SR8_SEoVroKp29OhjYrbZMORWsBY5hWGQvZgtLpcZ0Qa-NHFtaL-GAA4PXQHrY4jpUZXdcFvw23mU09sitiQA9LIRZrpHeUfcuXYjG50xffNbTd9J54SdSxbPohMwKQkVtF6IerCHyUJHOKRQGdcXhWMRqgizHnEQJORIxtWE3AGPZ3-WYUeMSOerip3bziXXuLO5IOOTKzg6v12yOptVI2j2VTT18TLOC-l0YJIG8Zx_v4fFWJbg3riIjlLy6_gn5Jgd7sG3IP0k_hQrkKQaOJOTvTjw-F1ZBdvL7ApS9qACTJImtXeTizV1wjonPfeXMLOmVPoAlZ95vHPyQoH0QvTXpepXtFuhBBOzE61T4v9sLhW6arCgb_tUEO1tNlMSZA6xh2rCA0QCSttpnBcG1l2xzcmf25-nWWdwH3gq018FLtCNARF3Kat7TwKiIOFBzz-Gw59Jti1UlaDG_ghtA0rmtF7YCnNtjj7We77BkofAYgPNhp8qG6793OVOXiSuRa_ZMMY3_TAxH0LVzVCABf5XyKbBUBXd7khHd6mCitQuSaXssxnUy180_bPkxN8UR8eZjkmOqBfQlIjMmAFl0BVuWomQGFeMkZ0H1_2B9k3ktAhnhoWpOliNG1Rpc2EsQyWXAleHet3kETrQRnmpSUTIowEuiYzZZa9jcrZdyyWoWoEGazcL425XNqE2XkHqJfjEY8-vxYW2N63pNWpI1IL5NjvXJT3EeBurMJ9_2ww=w867-h860-no?authuser=0", "Oreology" },
                    { 2, "https://lh3.googleusercontent.com/UiNQ8o17vg9jGXxTTXo5luBMsV-yTkTgTYZ1hqjHMtao9Yp6Q-o_FIMgtmcY1oirsBR5HvpBhPC0r_IQQ9pas3HwbAYd5v6WI5ByHls9tKaIgRhn1Fdb2r_dnJwaqAcmQ3jVFsUljfK6JW_YBNMS53J8jZ-8IsRpbbMOmzqfzTPGaZ7mHYiw2q61FUQUU_novcHIbFhksbCSVn2Axo1WQKCyk9FcKDsGPIZ9zPS0yOLpTey6Vgfu9zvlep8c2AZsg-87EqJQ9mIO5v3tb-v0cR1B1qIcOuSQceXjBrfSfiwIJzYCCL1hAfxfP-2LD0KtLAMEV4hYVvkfYnJy42IfABTIpRsmawIYVDCH5JF-oKb1wwoNNf1TEXt6FzsJycbTQIWBt8sdPkKHiM2e6N4BDGqOOotpYo5ij84EFcQrAM-mll7j5nS_gPayfXPn6pavIyUeLQdWvg5BhjKXM8kNN8ShQAfIKPvdNtn4x8dAthHCAgtMfqlZE8mKHzL9241GJ_xa3ZbI-YYKsyA2wKVGCiXbpb23bkoAdqGGF3fY2pd5zEwmZZo_bJPc2YoXmpW6uodMIoM7vZDBw_GKrH2tqfeu02sKyXDn60awNqLaJR3I_6IoCbu72dg7qVx7vCihvXSSM5d2s2oo8LjwLvM7SScd2CUWPA_rq4bcQ0ozQhDq5c8BxCAjz8pLdntNvd_r_u9xNdqql-ydnUnXAgMqpeayfNnxy87OQn7pLM6lrYPogjzYbBBL2i8Kzw=w867-h860-no?authuser=0", "French Cruller" },
                    { 3, "https://lh3.googleusercontent.com/zQNt-CrnhN80fU7zpvFNiiSnzlEvrlGATGl2HixCLfDPrFDFDtZd9DJ-JXth4bCzl9HOVW5tWR-k5zbl6XL-oRaluN_cFRSIxP9fqy0d8ezO0eTUI5H2M6n4_-cm3j51I7kCXmzEtLo25IIo5b6WLi9odlvxbQ4eXnERPKMzybBpOd9A2jKs18Wix2TF7EPXwrh_qHIE4eCzlHd4hjKOSUyAEEz_TeHmmw-_xM8Ofbshimtb4sHWNmOqQf8hruNlkmRBcYazPNvH1Um18Jn1aYbz-5vHBjcV-00pLuHmgYTjDHMu6Kf3BGEBWWbKA8q4KzTehqervbwT_0gFuqfLsu2qiuxBAmAc2AyMyMFSqGilyXtgDbMw2u_sRyqmQS37xq9aZAUFEi0xU2LRg7c6kGeOLC97Vsoms1kHAIecHkyEb4p1rBC2GwAvlpqv3luDav4MRWdg35KGJvCiaZm4sT7XSrsqdP9sniykp2F4VwBATHKS2gnhtlAr9aRTBRgu-JMx0PiluI0olXgSg1TdQz5At75gdGRUdX-4qYuS3BvQfGrb6GtMxcnZoo1aJ8oQFeXAwYylxZ9VI7QE0bf-QCfDZQspo81oLwCcUNjq-RpD-T6Ly3AYlzfJkQ2P9JAuTY_CPVbzzzeLJ8hrvD3wEHD8wXWZt460FUtCMoLdwngUajSbIBzNP7VeDA8GUMr6vSNyujO4U_H0x37XAMs6w0_TKUeF2e72LkJcDgHulstvIcC0dkWUDpMtFg=w867-h860-no?authuser=0", "Swirl It" },
                    { 4, "https://lh3.googleusercontent.com/378QW1GaW-z177NTIJn9Y7lcwoVXXJt-b2QtBFDi76PgLOe3m8iwyXe8J1Yv8a8EdJGqLlsFlj0CGrKE_AWBboNjhCeSEtKIBhv2LKSw8W-78rPmfVgfXPELyS_lBlO4wmaIWUfloSanOSfVmH6vrARkJ8mrJ_rh-E4hcUGiznJRN467-klW1RyAcE7A5PlEsCu1N-4u98GLvlHiPeGxKTwx7hlempguh_wGDSuLr-p8Q8w4qb9TRWd-7m_XRCOzf6orEbTEJZyL-dt2pQicxEU0A9ApoIZpAO8RvKSPffhZFY1u4hEaByWU-AUC8oRuA2-vwDxlltyOTXZejWqqOKO9gqVy_V2vmSibuuXq034FmmmoUeTJTzZZXJ9V_HEk7nyKhvOFy2aaCSgbpmwvZfWtSiPIH9c433afZCpmK3hTxjkVbLR2sZzie_G9VxUA38bRcOJEelPw_ILF0NYc3r8NWoCK5BIz9AFeF_43XOJIjCYMwe75frjr2urMcIWUKNV3wG4QLWAJsfecvAMPWI2SmDW9muoQn2VMzmChfxnVisWNhljyR4D1OItOEecnxED9iiMMuNUBaA53dQh3K0bKe1NFrbapq9oDv5yT1QrJ-jKNE16aTvrOcZPq131U8IifBYEm4qMg7NQh2EBQVwS6eP67llQZov45WopvN3O-E09Xw8mVOGUOIi_KoYsHj84Jocl8Ss_6rSS_-wj4adL1lK_2_aly2VGeSrfzWHPu9w3Rnlh4B7vZLg=w867-h860-no?authuser=0", "Maple Drizzle" },
                    { 5, "https://lh3.googleusercontent.com/amGFPEDNO_F5oAbPqkeiQG6lFf_Es_WAmXH26bIwc3NOD1Ln1a422eYIPc6j2E9ogeMmfiOOlDZlnqaC77fYxlBB7CABtVauTliU_qsPFR-X9s6E0dVJkuL3M27s1iPosW5Xr5qwyOoxkthI4pHeJaYKnZUARxDVH1qxS1zkjL-4ZRceK630zO3M3iWj6FAnlgYmaAKJuXJu1oEol8dkkCHWuCW7qHZkzcobawB4WL5vh5ZzzlX5rUrNMdl6L2spbt1DVsdh9QSsqdMw7dHpJoYw0x_n1ykImeHC7wdLWcpWfM_4bpa81NHJEvs2QO3poz1aQrdzAYShUbDOJSkjt5s3wb29udv-LdxxF2QvIHbSW1p2uQl6OV8fu8-0kVIT-7mPgvQstRypqaICGhoVgE-jFmK0JK2TUc0sGFxYjgxVTtB4F-kFnj6EpHHjFg-oO-smTqrYh2U2oFVFCnN12IS3jXYtLSngYyVF47DrollY206qyG5n6pELRo_lj8zZivD3o03xF3-DuU-K1w5SKEWQSd5B13OtTPU-ys_o4DE5h47ixyWl1ePOmA4NEWbvbmVsuvZb7wAK2Xnv1hxZNKwWPDd1dfka1Opq108FLavvbv-uzencWnr2c__mMdKrBxRtwmZrJxZWw2-t2--Wf2bPy_-Ujfz4dfgWqFqFDoOsymYDCVegqlHladriI-E2UYA6EBsA6u1jMG-U-1zJNLk8ovZnj-fTWIQwe_wJpVX5INKQyKCfBjjXlg=w867-h860-no?authuser=0", "Snow Desert" }
                });

            migrationBuilder.InsertData(
                table: "Ingredients",
                columns: new[] { "Id", "DonutId", "Name" },
                values: new object[,]
                {
                    { 1, 1, "Chocolate" },
                    { 2, 2, "Milk" },
                    { 3, 3, "Milk" },
                    { 4, 4, "Milk" },
                    { 5, 5, "Milk" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ingredients_DonutId",
                table: "Ingredients",
                column: "DonutId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ingredients");

            migrationBuilder.DropTable(
                name: "Donuts");
        }
    }
}
