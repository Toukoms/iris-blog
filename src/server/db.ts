import { env } from "@/env";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = global as unknown as {
	db: PrismaClient;
};

const db =
	globalForPrisma.db ||
	new PrismaClient({
		log:
			env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
		errorFormat: "pretty",
	}).$extends(withAccelerate());

if (env.NODE_ENV !== "production") globalForPrisma.db = db;

export default db;
