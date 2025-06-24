import prisma from "../config/prisma.config";
import ApiResponse from "../helper/ApiResponse";
import asyncHandler from "../helper/asyncHandler";
export const getStores = asyncHandler(async (req, res) => {
    const { sort, city, zipcode } = req.body;
    const stores = await prisma.store.findMany({
        where: {
            AND: [
                city ? {
                    address: {
                        city: {
                            city: city
                        }
                    }
                } : {},
                zipcode ? {
                    address: {
                        postal_code: zipcode
                    }
                } : {}
            ],
        },
        select: {
            store_id: true,
            staff_store_manager_staff_idTostaff: {
                select: {
                    staff_id: true,
                    first_name: true,
                    last_name: true,
                }
            },
            _count: true,
            address: {
                include: {
                    city: true
                }
            }
        },
        orderBy: [
            sort?.id ? { store_id: sort.id } : {},
            sort?.rental_count ? {
                inventory: {
                    _count: sort.rental_count
                }
            } : {},
            sort?.staff_count ? {
                staff_staff_store_idTostore: {
                    _count: sort.rental_count
                }
            } : {}
        ]
    });
    return res.send(stores);
});
export const getStoreDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const store = await prisma.store.findFirst({
        where: { store_id: Number(id) },
        select: {
            store_id: true,
            staff_store_manager_staff_idTostaff: {
                select: {
                    staff_id: true,
                    first_name: true,
                    last_name: true,
                }
            },
            staff_staff_store_idTostore: {
                select: {
                    staff_id: true,
                    first_name: true,
                    last_name: true,
                }
            },
            inventory: {
                take: 5
            },
            address: {
                include: {
                    city: true
                }
            }
        },
    });
    const rentals = await prisma.rental.findMany({
        where: {
            inventory: {
                store: {
                    store_id: Number(id)
                }
            }
        },
        take: 10
    });
    return res.send(new ApiResponse("data", 200, { store, rentals }));
});
