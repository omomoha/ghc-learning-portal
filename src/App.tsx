import { Routes, Route, Navigate } from "react-router-dom";
import { RequireAuth } from "@/auth/RequireAuth";
import { RequireAdmin } from "@/auth/RequireAdmin";

import { Landing } from "@/routes/Landing";
import { Login } from "@/routes/Login";
import { Signup } from "@/routes/Signup";
import { ForgotPassword } from "@/routes/ForgotPassword";

import { LearnHome } from "@/routes/learn/Home";
import { Module } from "@/routes/learn/Module";
import { Prerequisites } from "@/routes/learn/Prerequisites";
import { Dashboard } from "@/routes/learn/Dashboard";

import { AdminOverview } from "@/routes/admin/Overview";
import { AdminUsers } from "@/routes/admin/Users";
import { AdminUserDetail } from "@/routes/admin/UserDetail";
import { AdminResources } from "@/routes/admin/Resources";

import { LegacyHashRedirect } from "@/components/LegacyHashRedirect";
import { RouteAnnouncer } from "@/components/RouteAnnouncer";
import { RedirectIfAuthed } from "@/components/RedirectIfAuthed";
import { NotFound } from "@/routes/NotFound";

export function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <LegacyHashRedirect />
      <RouteAnnouncer />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={
            <RedirectIfAuthed>
              <Login />
            </RedirectIfAuthed>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectIfAuthed>
              <Signup />
            </RedirectIfAuthed>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <RedirectIfAuthed>
              <ForgotPassword />
            </RedirectIfAuthed>
          }
        />

        {/* Gated learner */}
        <Route
          path="/learn"
          element={
            <RequireAuth>
              <Navigate to="/learn/home" replace />
            </RequireAuth>
          }
        />
        <Route
          path="/learn/home"
          element={
            <RequireAuth>
              <LearnHome />
            </RequireAuth>
          }
        />
        <Route
          path="/learn/module/:id"
          element={
            <RequireAuth>
              <Module />
            </RequireAuth>
          }
        />
        <Route
          path="/learn/prerequisites"
          element={
            <RequireAuth>
              <Prerequisites />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminOverview />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/users"
          element={
            <RequireAdmin>
              <AdminUsers />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/users/:uid"
          element={
            <RequireAdmin>
              <AdminUserDetail />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/resources"
          element={
            <RequireAdmin>
              <AdminResources />
            </RequireAdmin>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
