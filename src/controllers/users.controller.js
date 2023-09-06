export const getUsers = async () => {
    try {
        const users = await prisma.user.findMany();
        if (users.length === 0) {
            return res
                .status(400)
                .json({ ok: false, message: "list users are empty" });
        }
        return res.json({ ok: true, data: users });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: "Something went wrong!",
        });
    } finally {
        async () => await prisma.$disconnect();
    }
}