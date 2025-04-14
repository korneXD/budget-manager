import { describe, it, expect, vi, beforeEach } from "vitest";
import * as firestore from "firebase/firestore";
import {
  readCategories,
  readTargets,
  readTransactions,
  readSettings,
  addCateg,
  addTransaction,
  addTarget,
  addSettings,
  updateCurrency,
  deleteCategory,
  deleteCategories,
  deleteTransactions,
  deleteTransactionByCategory,
  deleteTarget,
  deleteTransaction,
  deleteSettings,
} from "../utility/crudUtility"; // <-- Cseréld ki a saját fájlnevedre!

vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual("firebase/firestore");
  return {
    ...actual,
    collection: vi.fn(),
    query: vi.fn(),
    onSnapshot: vi.fn(),
    orderBy: vi.fn(),
    addDoc: vi.fn(),
    setDoc: vi.fn(),
    updateDoc: vi.fn(),
    deleteDoc: vi.fn(),
    doc: vi.fn(),
    where: vi.fn(),
    getDocs: vi.fn(),
  };
});

const mockSnapshot = {
  docs: [
    { id: "1", data: () => ({ name: "Test1" }) },
    { id: "2", data: () => ({ name: "Test2" }) },
  ],
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("read functions", () => {
  it("readCategories should subscribe and call setCategories", () => {
    const setCategories = vi.fn();
    firestore.collection.mockReturnValue("mockCollection");
    firestore.query.mockReturnValue("mockQuery");
    firestore.onSnapshot.mockImplementation((_, cb) => {
      cb(mockSnapshot);
      return () => {};
    });

    readCategories(setCategories);

    expect(setCategories).toHaveBeenCalledWith([
      { id: "1", name: "Test1" },
      { id: "2", name: "Test2" },
    ]);
  });

  it("readTargets should order by name", () => {
    const setTargets = vi.fn();
    firestore.collection.mockReturnValue("mockCollection");
    firestore.query.mockReturnValue("mockQuery");
    firestore.orderBy.mockReturnValue("orderByName");
    firestore.onSnapshot.mockImplementation((_, cb) => {
      cb(mockSnapshot);
      return () => {};
    });

    readTargets(setTargets);

    expect(firestore.orderBy).toHaveBeenCalledWith("name", "asc");
    expect(setTargets).toHaveBeenCalled();
  });

  it("readTransactions should order by name", () => {
    const setTransactions = vi.fn();
    firestore.collection.mockReturnValue("mockCollection");
    firestore.query.mockReturnValue("mockQuery");
    firestore.orderBy.mockReturnValue("orderByName");
    firestore.onSnapshot.mockImplementation((_, cb) => {
      cb(mockSnapshot);
      return () => {};
    });

    readTransactions(setTransactions);

    expect(setTransactions).toHaveBeenCalled();
  });

  it("readSettings should call onSnapshot with correct query", () => {
    const setSettings = vi.fn();
    firestore.collection.mockReturnValue("mockCollection");
    firestore.query.mockReturnValue("mockQuery");
    firestore.onSnapshot.mockImplementation((_, cb) => {
      cb(mockSnapshot);
      return () => {};
    });

    readSettings(setSettings);

    expect(setSettings).toHaveBeenCalled();
  });
});

describe("add functions", () => {
  it("addCateg should call addDoc with category", async () => {
    firestore.collection.mockReturnValue("mockCollection");
    await addCateg({ name: "Test" });
    expect(firestore.addDoc).toHaveBeenCalledWith("mockCollection", {
      name: "Test",
    });
  });

  it("addTransaction should call addDoc with transaction", async () => {
    firestore.collection.mockReturnValue("mockCollection");
    await addTransaction({ amount: 100 });
    expect(firestore.addDoc).toHaveBeenCalledWith("mockCollection", {
      amount: 100,
    });
  });

  it("addTarget should call addDoc with target", async () => {
    firestore.collection.mockReturnValue("mockCollection");
    await addTarget({ goal: 5000 });
    expect(firestore.addDoc).toHaveBeenCalledWith("mockCollection", {
      goal: 5000,
    });
  });

  it("addSettings should call setDoc with default HUF", async () => {
    firestore.doc.mockReturnValue("mockDocRef");
    await addSettings("user123");
    expect(firestore.setDoc).toHaveBeenCalledWith("mockDocRef", {
      currency: "HUF",
    });
  });
});

describe("update functions", () => {
  it("updateCurrency should call updateDoc with currency", async () => {
    firestore.doc.mockReturnValue("mockDocRef");
    await updateCurrency("user123", "USD");
    expect(firestore.updateDoc).toHaveBeenCalledWith("mockDocRef", {
      currency: "USD",
    });
  });
});

describe("delete functions", () => {
  it("deleteCategory should call deleteDoc with correct doc ref", async () => {
    firestore.doc.mockReturnValue("mockDocRef");
    await deleteCategory("cat123");
    expect(firestore.deleteDoc).toHaveBeenCalledWith("mockDocRef");
  });

  it("deleteTransaction should call deleteDoc", async () => {
    firestore.doc.mockReturnValue("mockDocRef");
    await deleteTransaction("trx123");
    expect(firestore.deleteDoc).toHaveBeenCalledWith("mockDocRef");
  });

  it("deleteTarget should call deleteDoc", async () => {
    firestore.doc.mockReturnValue("mockDocRef");
    await deleteTarget("tgt123");
    expect(firestore.deleteDoc).toHaveBeenCalledWith("mockDocRef");
  });

  it("deleteSettings should call deleteDoc", async () => {
    firestore.doc.mockReturnValue("mockDocRef");
    await deleteSettings("user123");
    expect(firestore.deleteDoc).toHaveBeenCalledWith("mockDocRef");
  });

  it("deleteCategories should query and delete all matching", async () => {
    const docs = [{ id: "1" }, { id: "2" }];
    firestore.collection.mockReturnValue("mockCollection");
    firestore.query.mockReturnValue("mockQuery");
    firestore.getDocs.mockResolvedValue({
      forEach: (cb) => docs.forEach((d) => cb(d)),
    });
    firestore.doc.mockImplementation((_db, col, id) => `doc:${col}/${id}`);

    await deleteCategories("user1");

    expect(firestore.deleteDoc).toHaveBeenCalledWith("doc:categories/1");
    expect(firestore.deleteDoc).toHaveBeenCalledWith("doc:categories/2");
  });

  it("deleteTransactions should query and delete all", async () => {
    const docs = [{ id: "tx1" }, { id: "tx2" }];
    firestore.collection.mockReturnValue("mockCollection");
    firestore.query.mockReturnValue("mockQuery");
    firestore.getDocs.mockResolvedValue({
      forEach: (cb) => docs.forEach((d) => cb(d)),
    });
    firestore.doc.mockImplementation((_db, col, id) => `doc:${col}/${id}`);

    await deleteTransactions("user1");

    expect(firestore.deleteDoc).toHaveBeenCalledWith("doc:transactions/tx1");
    expect(firestore.deleteDoc).toHaveBeenCalledWith("doc:transactions/tx2");
  });

  it("deleteTransactionByCategory should query and delete all", async () => {
    const docs = [{ id: "1" }];
    firestore.collection.mockReturnValue("mockCollection");
    firestore.query.mockReturnValue("mockQuery");
    firestore.getDocs.mockResolvedValue({ forEach: (cb) => docs.forEach(cb) });
    firestore.doc.mockImplementation((_db, col, id) => `doc:${col}/${id}`);

    await deleteTransactionByCategory("categ1");

    expect(firestore.deleteDoc).toHaveBeenCalledWith("doc:transactions/1");
  });
});
